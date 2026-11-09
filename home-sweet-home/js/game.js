/**
 * HOME, SWEET HOME ! — LOGIQUE DU JEU
 * Pour personnaliser les dessins, le salon, les objets, les textes ou les positions :
 * >>> ouvrir js/config.js <<<
 * Ici se trouvent uniquement la progression, les sons et les interactions.
 */
'use strict';
const CONFIG = window.HSH_CONFIG;
if (!CONFIG || !Array.isArray(CONFIG.objects)) throw new Error('Configuration manquante : charger js/config.js avant js/game.js');
const OBJECTS = CONFIG.objects;
const ASSETS = CONFIG.assets;

const STORAGE_KEY = 'hsh-face-alsace-salon-v2';
const SOUND_KEY = 'hsh-face-alsace-sound-v1';
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const objectById = (id) => OBJECTS.find((item) => item.id === id);
let answers = {};
let screen = 'home';
let currentObject = null;
let soundEnabled = true;
let audioContext = null;
let toastTimer = null;

function readSavedAnswers() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const safe = {};
    if (parsed && typeof parsed === 'object') {
      OBJECTS.forEach((item) => {
        if (parsed[item.id] === true || parsed[item.id] === false) safe[item.id] = parsed[item.id];
      });
    }
    return safe;
  } catch (_) { return {}; }
}
function saveAnswers() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(answers)); } catch (_) { /* sans stockage, le jeu reste jouable */ } }
function saveSound() { try { localStorage.setItem(SOUND_KEY, soundEnabled ? 'on' : 'off'); } catch (_) {} }
function doneCount() { return Object.keys(answers).length; }
function correctCount() { return Object.values(answers).filter(Boolean).length; }
function score() { return correctCount() * 100; }
function formatScore(n) { return String(n).padStart(3, '0'); }

function playSound(kind = 'tap') {
  if (!soundEnabled) return;
  try {
    const AudioClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioClass) return;
    audioContext ||= new AudioClass();
    if (audioContext.state === 'suspended') audioContext.resume();
    const now = audioContext.currentTime;
    const notes = kind === 'success' ? [523.25, 659.25, 783.99, 1046.5]
      : kind === 'finish' ? [523.25, 659.25, 783.99, 987.77, 1174.66]
      : kind === 'wrong' ? [293.66, 246.94]
      : [440];
    notes.forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const start = now + i * (kind === 'tap' ? 0 : 0.095);
      osc.type = 'sine'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.08, start + 0.014);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);
      osc.connect(gain); gain.connect(audioContext.destination);
      osc.start(start); osc.stop(start + 0.24);
    });
  } catch (_) { /* l'audio est optionnel */ }
}
function showToast(message) {
  const el = $('#toast'); el.textContent = message; el.classList.add('visible');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'), 2500);
}
function updateSoundToggle() {
  const button = $('#sound-toggle');
  button.setAttribute('aria-pressed', String(soundEnabled));
  button.setAttribute('aria-label', soundEnabled ? 'Désactiver les sons' : 'Activer les sons');
  $('span', button).textContent = soundEnabled ? 'Son : ON' : 'Son : OFF';
  button.classList.toggle('is-muted', !soundEnabled);
}
function setScreen(name) {
  screen = name;
  ['home', 'game', 'end'].forEach((part) => {
    const section = $(`#screen-${part}`);
    section.hidden = part !== name;
  });
  if (name === 'home') updateResumeButton();
  if (name === 'game') updateGameUI();
  if (name === 'end') renderEnd();
  window.scrollTo({top: 0, behavior: 'instant'});
}
function updateResumeButton() {
  $('#resume-button').hidden = doneCount() === 0;
  $('#resume-button').innerHTML = doneCount() === OBJECTS.length
    ? 'Revoir mon bilan <span aria-hidden="true">↗</span>'
    : `Reprendre ma partie (${doneCount()}/${OBJECTS.length}) <span aria-hidden="true">↗</span>`;
}
function resetAndStart() {
  answers = {}; saveAnswers();
  setScreen('game');
  showToast('C’est parti ! À toi de jouer ♡');
}
function continueSaved() {
  setScreen(doneCount() === OBJECTS.length ? 'end' : 'game');
}
function makeHotspots() {
  $('#hotspots').innerHTML = OBJECTS.map((item, index) => `
    <button type="button" class="hotspot ${item.presentation === 'illustration' ? 'art-only' : ''}" data-object="${item.id}" style="--x:${item.x}%;--y:${item.y}%;--w:${item.w}%;--h:${item.h}%" aria-label="Examiner : ${escapeHTML(item.name)}">
      <img src="${item.image}" alt="" draggable="false" width="160" height="160">
      <span class="hotspot-number">${String(index + 1).padStart(2, '0')}</span>
      <span class="hotspot-label">${escapeHTML(item.short)}</span>
      <span class="hotspot-done" aria-hidden="true">✓</span>
    </button>`).join('');
}
function updateGameUI() {
  const count = doneCount();
  $('#progress-number').innerHTML = `${count}<span>/${OBJECTS.length}</span>`;
  $('#progress-bar').setAttribute('aria-valuenow', String(count));
  $('#progress-fill').style.width = `${(count / OBJECTS.length) * 100}%`;
  $('#current-score').textContent = formatScore(score());
  $('#finish-button').disabled = count !== OBJECTS.length;
  $$('.hotspot').forEach((button) => {
    const id = button.dataset.object;
    const done = Object.hasOwn(answers, id);
    button.classList.toggle('is-done', done);
    button.classList.toggle('is-correct', done && answers[id]);
    button.classList.toggle('is-wrong', done && !answers[id]);
    button.disabled = done;
    if (done) button.setAttribute('aria-label', `${objectById(id).name} : ${answers[id] ? 'bonne réponse' : 'réponse à revoir'}`);
  });
  $('#object-checklist').innerHTML = OBJECTS.map((item) => {
    const done = Object.hasOwn(answers, item.id);
    const verdict = !done ? 'À découvrir' : (answers[item.id] ? 'Bien joué !' : 'À revoir');
    return `<button type="button" class="checklist-item ${done ? 'checked' : ''} ${done && !answers[item.id] ? 'missed' : ''}" data-object="${item.id}" ${done ? 'disabled' : ''} aria-label="${escapeHTML(item.short)} : ${verdict}"><span class="list-icon">${done ? (answers[item.id] ? '✓' : '×') : '○'}</span><span>${escapeHTML(item.short)}</span><span class="list-note">${verdict}</span></button>`;
  }).join('');
}
function openObject(id) {
  const item = objectById(id);
  if (!item || Object.hasOwn(answers, id)) return;
  currentObject = id;
  playSound('tap');
  const content = $('#object-panel-body');
  content.innerHTML = `<div class="object-body">
    <div class="object-art-col"><span class="art-washi" aria-hidden="true"></span><div class="object-art-frame"><img src="${item.image}" alt="Illustration provisoire de ${escapeHTML(item.name)}" width="160" height="160"></div><span class="art-caption">TON DESSIN ICI ! ✎</span><div class="object-sticker">${escapeHTML(item.sticker)}</div></div>
    <div class="object-content"><span class="eyebrow">OBJET ${String(OBJECTS.indexOf(item) + 1).padStart(2, '0')} / ${OBJECTS.length}</span><h2 id="object-dialog-title">${escapeHTML(item.name)} <span aria-hidden="true">✳</span></h2><p>${escapeHTML(item.intro)}</p><strong class="object-question">${escapeHTML(item.question)}</strong><div class="choice-list">${item.choices.map((choice, index) => `<button type="button" class="choice-button" data-choice="${index}"><span class="choice-circle">${String.fromCharCode(65 + index)}</span><span>${escapeHTML(choice.label)}</span><span aria-hidden="true">↗</span></button>`).join('')}</div><p class="choice-tip">Pas de pression : choisis ce qui te semble juste ♡</p></div>
  </div>`;
  $('#object-dialog').showModal();
}
function choose(index) {
  const item = objectById(currentObject);
  if (!item || Object.hasOwn(answers, item.id) || !item.choices[index]) return;
  const correct = item.choices[index].correct;
  answers[item.id] = correct;
  saveAnswers(); updateGameUI();
  playSound(correct ? 'success' : 'wrong');
  $('#object-panel-body').innerHTML = `<div class="feedback-body ${correct ? 'feedback-good' : 'feedback-wrong'}">
    <div class="feedback-sparkle" aria-hidden="true">${correct ? '✦ ✿ ✦' : '✎ ? ✎'}</div>
    <div class="feedback-symbol" aria-hidden="true">${correct ? '✓' : '↝'}</div>
    <span class="eyebrow">OBJET ${String(OBJECTS.indexOf(item) + 1).padStart(2, '0')} / ${OBJECTS.length}</span>
    <h2 id="object-dialog-title">${correct ? 'Trop fort ! ♡' : 'On apprend tous les jours !'}</h2>
    <p class="feedback-description">${escapeHTML(correct ? item.good : item.bad)}</p>
    ${correct ? `<div class="badge-earned"><span class="badge-icon">${item.emoji}</span><div><small>NOUVEAU BADGE DÉBLOQUÉ</small><b>${escapeHTML(item.badge)}</b></div></div>` : `<div class="feedback-reminder"><strong>À retenir :</strong> ${escapeHTML(item.memo)}</div>`}
    <button type="button" class="btn btn-primary btn-full" id="continue-button">${doneCount() === OBJECTS.length ? 'Découvrir mon bilan ↗' : 'Continuer l’exploration ↗'}</button>
    <div class="dialog-mini-progress">${doneCount()} objet${doneCount() > 1 ? 's' : ''} sur ${OBJECTS.length} exploré${doneCount() > 1 ? 's' : ''}</div>
  </div>`;
  $('#continue-button').focus();
}
function afterFeedback() {
  $('#object-dialog').close(); currentObject = null;
  if (doneCount() === OBJECTS.length) { playSound('finish'); setScreen('end'); }
  else showToast('Encore des objets à explorer ! ✦');
}
function renderAchievements() {
  $('#achievement-grid').innerHTML = OBJECTS.map((item) => {
    const achieved = answers[item.id] === true;
    return `<div class="achievement ${achieved ? 'unlocked' : 'locked'}"><div class="achievement-medal" aria-hidden="true">${achieved ? item.emoji : '?'}</div><div class="achievement-name">${achieved ? escapeHTML(item.badge) : 'Badge mystère'}</div><small>${achieved ? escapeHTML(item.short) : 'À débloquer'}</small></div>`;
  }).join('');
}
function renderEnd() {
  const correct = correctCount();
  $('#final-score').textContent = formatScore(score());
  $('#final-correct').textContent = String(correct);
  $('#end-total').textContent = String(OBJECTS.length);
  $('#end-message').textContent = correct === OBJECTS.length ? 'Incroyable ! Tu as repéré tous les bons gestes. La planète te dit merci !'
    : correct / OBJECTS.length >= .75 ? 'Quel joli parcours ! Tu connais déjà plein de bons réflexes. Encore un petit effort !'
    : correct / OBJECTS.length >= .4 ? 'Beau début ! Chaque découverte est une façon d’apprendre et de progresser.'
    : 'Tu as découvert de nouvelles astuces, et c’est déjà une victoire. Tu peux retenter ta chance !';
  $('#results-list').innerHTML = OBJECTS.map((item) => `<div class="result-item ${answers[item.id] ? 'result-success' : 'result-error'}"><span class="result-mark">${answers[item.id] ? '✓' : '×'}</span><div><strong>${escapeHTML(item.short)}</strong><p>${escapeHTML(item.memo)}</p></div><small>${answers[item.id] ? '+100' : '+0'}</small></div>`).join('');
}
function openDialog(id) { if (id === 'achievements-dialog') renderAchievements(); $( `#${id}` ).showModal(); }
function closeDialog(id) { const dialog = $(`#${id}`); if (dialog?.open) dialog.close(); }
function handleAction(action) {
  switch (action) {
    case 'home': $$('.popup[open]').forEach((dialog) => dialog.close()); setScreen('home'); break;
    case 'help': openDialog('help-dialog'); break;
    case 'pause': if (screen === 'game') openDialog('pause-dialog'); break;
    case 'achievements': openDialog('achievements-dialog'); break;
  }
}
function setConfiguredArtwork() {
  document.querySelectorAll('[data-asset]').forEach((el) => {
    const configured = ASSETS[el.dataset.asset];
    if (configured) el.setAttribute(el.tagName === 'LINK' ? 'href' : 'src', configured);
  });
  document.querySelectorAll('[data-total]').forEach((el) => { el.textContent = OBJECTS.length; });
  $('#progress-bar').setAttribute('aria-valuemax', String(OBJECTS.length));
}
function initialize() {
  setConfiguredArtwork();
  answers = readSavedAnswers();
  try { soundEnabled = localStorage.getItem(SOUND_KEY) !== 'off'; } catch (_) { soundEnabled = true; }
  updateSoundToggle(); makeHotspots(); setScreen('home');
  document.addEventListener('click', (event) => {
    const actionButton = event.target.closest('[data-action]');
    if (actionButton) { handleAction(actionButton.dataset.action); return; }
    const closeButton = event.target.closest('[data-close]');
    if (closeButton) { closeDialog(closeButton.dataset.close); return; }
    const objectButton = event.target.closest('[data-object]');
    if (objectButton) { openObject(objectButton.dataset.object); return; }
    const choiceButton = event.target.closest('[data-choice]');
    if (choiceButton) { choose(Number(choiceButton.dataset.choice)); return; }
    if (event.target.closest('#continue-button')) { afterFeedback(); }
  });
  $('#start-button').addEventListener('click', resetAndStart);
  $('#resume-button').addEventListener('click', continueSaved);
  $('#replay-button').addEventListener('click', resetAndStart);
  $('#finish-button').addEventListener('click', () => { if (doneCount() === OBJECTS.length) setScreen('end'); });
  $('#sound-toggle').addEventListener('click', () => { soundEnabled = !soundEnabled; saveSound(); updateSoundToggle(); if (soundEnabled) playSound('success'); });
  $('#pause-home').addEventListener('click', () => { closeDialog('pause-dialog'); setScreen('home'); });
  $('#pause-restart').addEventListener('click', () => { closeDialog('pause-dialog'); resetAndStart(); });
  // Clic sur l'arrière-plan des fenêtres modales pour fermer. Ne ferme jamais la fenêtre du résultat involontairement.
  $$('.popup').forEach((dialog) => dialog.addEventListener('click', (event) => {
    if (event.target === dialog && dialog.id !== 'object-dialog') dialog.close();
  }));
  document.addEventListener('keydown', (event) => {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) || event.altKey || event.ctrlKey || event.metaKey) return;
    if ($$('.popup[open]').length) return;
    if (event.key.toLowerCase() === 'p' && screen === 'game') openDialog('pause-dialog');
    if (event.key === '?') openDialog('help-dialog');
  });
  $('#object-dialog').addEventListener('close', () => { currentObject = null; });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
else initialize();
