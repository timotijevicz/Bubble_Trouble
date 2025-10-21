// Set active navbar link based on current page
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'home-eng.html')) {
      link.classList.add('active');
    }
  });
});

const stage = document.getElementById("stage");
const generateBtn = document.getElementById("generateBtn");
const solveBtn = document.getElementById("solveBtn");
const numbersBars = document.getElementById("numbersBars");
const selectAlgorithm = document.getElementById("selectAlgorithm");

let bars = [];
let delay = 100;

// Generiši novi niz
function generateArray() {
  stage.innerHTML = "";
  bars = [];
  const size = parseInt(numbersBars.value);
  for (let i = 0; i < size; i++) {
    const height = Math.floor(Math.random() * 250) + 30;
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${height}px`;
    bar.style.width = `${100 / size - 1}%`;
    stage.appendChild(bar);
    bars.push(bar);
  }
}

generateBtn.addEventListener("click", generateArray);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ---- ALGORITMI ----

// Bubble Sort
async function bubbleSort() {
  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      bars[j].classList.add("compare");
      bars[j + 1].classList.add("compare");
      await sleep(delay);
      const h1 = parseInt(bars[j].style.height);
      const h2 = parseInt(bars[j + 1].style.height);
      if (h1 > h2) {
        [bars[j].style.height, bars[j + 1].style.height] = [bars[j + 1].style.height, bars[j].style.height];
      }
      bars[j].classList.remove("compare");
      bars[j + 1].classList.remove("compare");
    }
    bars[bars.length - i - 1].classList.add("active");
  }
  bars.forEach(b => b.classList.add("active"));
}

// Selection Sort
async function selectionSort() {
  for (let i = 0; i < bars.length; i++) {
    let minIndex = i;
    bars[i].classList.add("compare");
    for (let j = i + 1; j < bars.length; j++) {
      bars[j].classList.add("compare");
      await sleep(delay);
      if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
        minIndex = j;
      }
      bars[j].classList.remove("compare");
    }
    [bars[i].style.height, bars[minIndex].style.height] = [bars[minIndex].style.height, bars[i].style.height];
    bars[i].classList.remove("compare");
    bars[i].classList.add("active");
  }
}

// Insertion Sort
async function insertionSort() {
  for (let i = 1; i < bars.length; i++) {
    let key = parseInt(bars[i].style.height);
    let j = i - 1;
    bars[i].classList.add("compare");
    while (j >= 0 && parseInt(bars[j].style.height) > key) {
      bars[j + 1].style.height = bars[j].style.height;
      j--;
      await sleep(delay);
    }
    bars[j + 1].style.height = `${key}px`;
    bars[i].classList.remove("compare");
    bars[i].classList.add("active");
  }
  bars.forEach(b => b.classList.add("active"));
}

// Quick Sort
async function quickSort(start = 0, end = bars.length - 1) {
  if (start >= end) return;

  const pivotIndex = await partition(start, end);
  await quickSort(start, pivotIndex - 1);
  await quickSort(pivotIndex + 1, end);
}

async function partition(start, end) {
  const pivot = parseInt(bars[end].style.height);
  let i = start - 1;
  for (let j = start; j < end; j++) {
    bars[j].classList.add("compare");
    await sleep(delay);
    if (parseInt(bars[j].style.height) < pivot) {
      i++;
      [bars[i].style.height, bars[j].style.height] = [bars[j].style.height, bars[i].style.height];
    }
    bars[j].classList.remove("compare");
  }
  [bars[i + 1].style.height, bars[end].style.height] = [bars[end].style.height, bars[i + 1].style.height];
  bars[i + 1].classList.add("active");
  return i + 1;
}

// Merge Sort
async function mergeSort(start = 0, end = bars.length - 1) {
  if (start >= end) return;
  const mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
}

async function merge(start, mid, end) {
  let left = start, right = mid + 1;
  const temp = [];

  while (left <= mid && right <= end) {
    bars[left].classList.add("compare");
    bars[right].classList.add("compare");
    await sleep(delay);

    if (parseInt(bars[left].style.height) < parseInt(bars[right].style.height)) {
      temp.push(bars[left].style.height);
      bars[left].classList.remove("compare");
      left++;
    } else {
      temp.push(bars[right].style.height);
      bars[right].classList.remove("compare");
      right++;
    }
  }

  while (left <= mid) temp.push(bars[left++].style.height);
  while (right <= end) temp.push(bars[right++].style.height);

  for (let i = 0; i < temp.length; i++) {
    bars[start + i].style.height = temp[i];
    bars[start + i].classList.add("active");
    await sleep(30);
  }
}


// --- Pokretanje ---
solveBtn.addEventListener("click", async () => {
  const algo = selectAlgorithm.value;
  switch (algo) {
    case "bubbleSort": await bubbleSort(); break;
    case "selectionSort": await selectionSort(); break;
    case "insertionSort": await insertionSort(); break;
    case "quickSort": await quickSort(); break;
    case "mergeSort": await mergeSort(); break;
    case "heapSort": await heapSort(); break;
  }
});
