const $text = document.getElementById("dialogue-text");
const $img = document.getElementById("character-image");
const $choices = document.getElementById("choice-buttons");
const $box = document.getElementById("text-box");

// 最低限の会話データ
const dialogues = [
  { text: "こんにちは、ノベルゲームの世界へようこそ！", image: "character1.png" },
  { text: "クリックでセリフが進む仕組みを作っている。", image: "character1.png" },
  { text: "ここで選択肢を出してみる。", image: "character2.png" },
  { text: "「はい」を選んだ。次のセリフへ。", image: "character1.png" },
  { text: "「いいえ」を選んだ。別ルートへ。", image: "character2.png" },
  { text: "ここまでで最低限のノベルゲームが動く。", image: "character1.png" }
];

// 選択肢（dialogueIndex で出すタイミングを指定）
const choiceEvents = [
  {
    dialogueIndex: 2,
    choices: [
      { text: "はい", nextIndex: 3 },
      { text: "いいえ", nextIndex: 4 }
    ]
  }
];

let index = 0;
let isChoosing = false;

function renderDialogue(i) {
  const d = dialogues[i];
  $text.textContent = d.text;
  if (d.image) $img.src = d.image;
}

function clearChoices() {
  $choices.innerHTML = "";
  isChoosing = false;
}

function findChoiceEvent(i) {
  return choiceEvents.find(ev => ev.dialogueIndex === i) || null;
}

function renderChoices(ev) {
  $choices.innerHTML = "";
  isChoosing = true;

  ev.choices.forEach(c => {
    const btn = document.createElement("button");
    btn.className = "choice-button";
    btn.textContent = c.text;

    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // テキストボックスのクリック進行と衝突させない
      index = c.nextIndex;
      renderDialogue(index);
      clearChoices();
    });

    $choices.appendChild(btn);
  });
}

function next() {
  if (isChoosing) return;

  index++;
  if (index >= dialogues.length) {
    index = dialogues.length - 1;
    return;
  }

  renderDialogue(index);

  const ev = findChoiceEvent(index);
  if (ev) renderChoices(ev);
}

// 初期表示
renderDialogue(index);

// クリックで進む
$box.addEventListener("click", () => {
  const ev = findChoiceEvent(index);
  if (ev && !isChoosing) {
    renderChoices(ev);
    return;
  }
  next();
});
