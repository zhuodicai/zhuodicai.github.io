// function getChordNotes() {
//     const input = document.getElementById("chordInput").value.trim();
//     const chord = Tonal.Chord.get(input);
  
//     const output = document.getElementById("output");
  
//     if (!chord.empty && chord.notes.length > 0) {
//       output.innerHTML = `
//         <strong>Chord:</strong> ${chord.name}<br />
//         <strong>Type:</strong> ${chord.type}<br />
//         <strong>Notes:</strong> ${chord.notes.join(", ")}
//       `;
//     } else {
//       output.innerHTML = `❌ Chord "${input}" not recognized.`;
//     }
//   }
  
const noteOrder = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function noteToFrequency(note) {
  // 解析音符，比如 "Bb4" 或 "A4"
  const regex = /^([A-G]#?|Bb|Db|Eb|Gb|Ab|Cb|Fb)(\d)$/i;
  const match = note.match(regex);
  if (!match) return null;

  let [_, pitch, octaveStr] = match;
  const octave = parseInt(octaveStr);

  // 降音符转升音符
  if (pitch.length === 2 && pitch[1] === 'b') {
    const flatMap = {
      "Bb": "A#",
      "Db": "C#",
      "Eb": "D#",
      "Gb": "F#",
      "Ab": "G#",
      "Cb": "B",
      "Fb": "E"
    };
    pitch = flatMap[pitch];
  }

  const noteIndex = noteOrder.indexOf(pitch);
  if (noteIndex === -1) return null;

  const A4Index = noteOrder.indexOf("A") + 4 * 12; // 9 + 48 = 57
  const noteNumber = noteIndex + octave * 12;
  const n = noteNumber - A4Index;

  return 440 * Math.pow(2, n / 12);
}


// 在全局只创建一个 AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playNoteDynamic(note) {
  const freq = noteToFrequency(note);
  if (!freq) {
    alert(`无法识别音符：${note}`);
    return;
  }

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = freq;
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();

  // 声音渐弱
  gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);

  oscillator.stop(audioCtx.currentTime + 1);
}

function playChord(notes) {
  // 在这里不新建 AudioContext，复用全局的 audioCtx

  notes.forEach(note => {
    // 确保音符带4八度，方便计算
    let fullNote = note;
    if (!/\d/.test(note)) fullNote += "4";

    const freq = noteToFrequency(fullNote);
    if (!freq) return;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = freq;
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();

    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);

    oscillator.stop(audioCtx.currentTime + 1);
  });
}



function getChordNotes() {
  const input = document.getElementById("chordInput").value.trim();
  const chord = Tonal.Chord.get(input);
  const output = document.getElementById("output");

  if (!chord.empty && chord.notes.length > 0) {
    output.innerHTML = `
      <strong>Chord:</strong> ${chord.name}<br />
      <strong>Type:</strong> ${chord.type}<br />
      <strong>Notes:</strong> ${chord.notes.join(", ")}<br />
      <strong>Suggested Frets:</strong> ${generateFretPattern(chord.notes)}<br />
      <strong>Suggested Frets (max 3 strings):</strong> ${generateFretPatternMax3Strings(chord.notes)}<br />
      <button onclick="playChord(${JSON.stringify(chord.notes)})">▶️ 播放和弦声音</button>
      <hr />
      <strong>Fretboard positions:</strong><br />
      ${generateMandolinFretboardPositions(chord.notes)}
    `;
  } else {
    output.innerHTML = `❌ Chord "${input}" not recognized.`;
  }
}

  
  // 曼陀林调弦（G D A E）→ [G3, D4, A4, E5]
  const mandolinStrings = ["G", "D", "A", "E"];
  const maxFrets = 7;
  
  // 半音序列（12个音）
  const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  
  // 工具：获取某个音升n个半音后的音名
  function transpose(note, semitones) {
    const index = chromatic.indexOf(note);
    return chromatic[(index + semitones) % 12];
  }
  
  // 生成曼陀林指板 + 查找和弦音位置
  function generateMandolinFretboardPositions(chordNotes) {
    let result = "";
  
    mandolinStrings.forEach((openNote, stringIndex) => {
      result += `<strong>String ${4 - stringIndex} (${openNote}):</strong> `;
      let foundFrets = [];
  
      for (let fret = 0; fret <= maxFrets; fret++) {
        const noteAtFret = transpose(openNote, fret);
        if (chordNotes.includes(noteAtFret)) {
          foundFrets.push(`${fret} (${noteAtFret})`);
        }
      }
  
      result += foundFrets.length > 0
        ? foundFrets.join(", ")
        : "(no chord tones)";
      result += "<br/>";
    });
  
    return result;
  }
  
  function generateFretPattern(chordNotes) {
    const pattern = [];
  
    mandolinStrings.forEach((openNote, stringIndex) => {
      let foundFret = null;
  
      for (let fret = 0; fret <= maxFrets; fret++) {
        const note = transpose(openNote, fret);
        if (chordNotes.includes(note)) {
          foundFret = fret;
          break; // 只选最靠近0品的那个
        }
      }
  
      if (foundFret !== null) {
        pattern.push(foundFret);
      } else {
        pattern.push("x"); // 不弹这根弦
      }
    });
  
    return pattern.reverse().join("-"); // 从String 1到4
  }
  
  function generateFretPatternMax3Strings(chordNotes) {
    // 每根弦可选品位（包含音）
    const stringOptions = mandolinStrings.map(openNote => {
      const frets = [];
      for (let fret = 0; fret <= maxFrets; fret++) {
        const note = transpose(openNote, fret);
        if (chordNotes.includes(note)) {
          frets.push(fret);
        }
      }
      return frets.length ? frets : [null]; // null表示该弦不弹
    });
  
    const stringsCount = mandolinStrings.length;
    let bestPattern = null;
    let bestScore = -1; // 覆盖音符数量
    let bestSumFret = 1000; // 品位总和，用来在覆盖音符相同时排序
  
    // 递归尝试不同弦的弹法，最多3根弦有音，其余为x
    function backtrack(index, pattern, stringsUsed) {
      if (index === stringsCount) {
        if (stringsUsed <= 3) {
          // 计算覆盖音符集合
          const notesCovered = new Set();
          pattern.forEach((fret, i) => {
            if (fret !== null && fret !== "x") {
              const note = transpose(mandolinStrings[i], fret);
              notesCovered.add(note);
            }
          });
          // 计算覆盖音数量
          const score = chordNotes.filter(n => notesCovered.has(n)).length;
          // 品位总和
          const sumFret = pattern.reduce((sum, f) => {
            if (f !== null && f !== "x") return sum + f;
            return sum;
          }, 0);
  
          // 选最优方案：先看覆盖音符数，再看品位和
          if (score > bestScore || (score === bestScore && sumFret < bestSumFret)) {
            bestScore = score;
            bestSumFret = sumFret;
            bestPattern = [...pattern];
          }
        }
        return;
      }
  
      // 当前弦尝试所有可选品位
      for (const fret of stringOptions[index]) {
        let newStringsUsed = stringsUsed;
        if (fret !== null) newStringsUsed++;
  
        // 剪枝：不能超过3根弦有音
        if (newStringsUsed > 3) continue;
  
        pattern[index] = fret === null ? "x" : fret;
        backtrack(index + 1, pattern, newStringsUsed);
      }
    }
  
    backtrack(0, [], 0);
  
    // 返回结果，reverse顺序为E-A-D-G（1-4弦）
    if (!bestPattern) return "x-x-x-x"; // 无解
    return bestPattern.reverse().join("-");
  }
