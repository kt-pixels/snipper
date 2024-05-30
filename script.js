const wheel = document.getElementById("spinner_wheel");
const selectBoxes = document.getElementById("boxes");
const selectTime = document.getElementById("time");
const spinSound = document.getElementById("spinSound");
const textarea = document.getElementById("textarea");

console.log(selectTime.value);

function spin() {
  const timeValue = selectTime.value;

  if (timeValue === "--SELECT--") {
    alert("please select Time");
    return;
  }

  const randomDegree = Math.floor(Math.random() * 3600) + 360; // Random degree between 360 and 3960
  wheel.style.transform = `rotate(${randomDegree}deg)`;

  const timeInSeconds = parseInt(timeValue);
  const duration = timeInSeconds * 1000;

  wheel.style.transitionDuration = `${duration / 1000}s`;

  spinSound.play();

  setTimeout(() => {
    // alert("Time's up!");
    // wheel.style.transition = '';
    // wheel.style.transform = 'rotate(0deg)';
    storeSpinResult();
    // Stop the spin sound
    spinSound.pause();
    spinSound.currentTime = 0;
  }, duration);
}

function genrateColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateWheel(){
  let boxesValue = parseInt(selectBoxes.value)
  wheel.innerHTML = ""
  for (let i = 0; i < boxesValue; i++) {
    const segment = document.createElement('div');
    segment.className = "content_segments";
    segment.style.setProperty('--i', i);
    segment.style.setProperty('--clr', genrateColor());
    segment.style.transform = `rotate(${(i - 1) * (360 / boxesValue)}deg)`
    segment.innerHTML = `<span></span>`;
    wheel.appendChild(segment);
  }
}


function updateText() {
  const values = textarea.value.split(',');
  const segments = document.querySelectorAll('.content_segments > span');
  segments.forEach((segment, index) => {
      if (values[index]) {
          segment.textContent = values[index].trim();
      } else {
          segment.textContent = "";
      }
  });
}


function storeSpinResult() {
  const resultDiv = document.querySelector(".spin_container .btn + .spinner_wheel .content_segments:nth-child(1) span");
  const resultValue = resultDiv.textContent;
  // Yaha par aap kuch bhi karein jo aap resultValue ke saath karna chahte hain, jaise use display karna ya store karna.
  console.log("Spin Result:", resultValue);
  // Example: Agar aap ek variable mein store karna chahte hain:
  // const storedValue = resultValue;
}

// storeSpinResult()