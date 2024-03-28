const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Trường Đại học Tôn Đức Thắng được thành lập vào ngày tháng năm nào?",
    choice1: "24/9/1997",
    choice2: "23/10/1996",
    choice3: "17/7/1995",
    choice4: "3/3/1998",
    answer: 1
  },
  {
    question: "Đặc điểm nhận dạng của sinh viên Tôn Đức Thắng là gì?",
    choice1: "Kỷ luật, lễ phép, chuyên nghiệp, sáng tạo, phụng sự",
    choice2: "Chuyên nghiệp, kỷ cương, phụng sự",
    choice3: "Kỷ luật, chuyên nghiệp, siêng năng, sáng tạo",
    choice4: "Phụng sự, siêng năng, kỷ cương, chuyên nghiệp",
    answer: 1
  },
  {
    question: "Trường Đại học Tôn Đức Thắng hiện có bao ngành đại học tiêu chuẩn?",
    choice1: "32 ngành",
    choice2: "40 ngành",
    choice3: "48 ngành",
    choice4: "16 ngành",
    answer: 2
  },
  {
    question: "Trường Đại học Tôn Đức Thắng là trường công lập trực thuộc:",
    choice1: "Bộ Công thương",
    choice2: "Bộ Giáo dục và Đào Tạo",
    choice3: "Bộ Văn hóa Thể thao và Du lịch",
    choice4: "Tổng Liên đoàn Lao động Việt Nam",
    answer: 4
  },
  {
    question: "Ngày hội Tư vấn tuyển sinh đại học năm 2024 Trường Đại học Tôn Đức Thắng diễn ra vào ngày nào?",
    choice1: "30/3/2023",
    choice2: "30/3/2024",
    choice3: "20/3/2024",
    choice4: "01/4/2024",
    answer: 2
  },
  {
    question: "Năm 2024, Trường Đại học Tôn Đức Thắng tuyển sinh trình độ đại học theo bao nhiêu phương thức tuyển sinh?",
    choice1: "02 phương thức",
    choice2: "03 phương thức",
    choice3: "04 phương thức",
    choice4: "01 phương thức",
    answer: 3
  },
  {
    question: "Trường Đại học Tôn Đức Thắng có bao nhiêu cơ sở?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 3
  },
  {
    question: "Ngành học nào sau đây không được đào tạo tại trường Đại học Tôn Đức Thắng?",
    choice1: "Công nghệ phần mềm",
    choice2: "Công nghệ y sinh",
    choice3: "Kinh doanh quốc tế",
    choice4: "Thiết kế đồ họa",
    answer: 2
  },
  {
    question: "Điểm chuẩn vào trường Đại học Tôn Đức Thắng theo phương thức điểm thi THPTQG năm 2023 cao nhất ở ngành nào?",
    choice1: "Kế toán",
    choice2: "Kỹ thuật phần mềm",
    choice3: "Marketing",
    choice4: "Kinh doanh quốc tế",
    answer: 4
  },
  {
    question: "Địa chỉ trường Đại học Tôn Đức Thắng nằm ở?",
    choice1: "19 Nguyễn Hữu Thọ, Tân Phong, Quận 7",
    choice2: "1 Võ Văn Ngân, Linh Chiểu, Thủ Đức",
    choice3: "2/4 Trần Xuân Soạn, Tân Thuận Tây, Quận 7",
    choice4: "300A Nguyễn Tất Thành, Phường 13, Quận 4",
    answer: 1
  },
  {
    question: "Thư viện của trường Đại học Tôn Đức Thắng có tên là gì?",
    choice1: "Tổng hành dinh tri thức (TDTU knowledge headquarters)",
    choice2: "Thư viện tiến bộ (TDTU PROGRESSIVE Library)",
    choice3: "Thư viện truyền cảm hứng (TDTU INSPIRE Library)",
    choice4: "Thư viện tương lai (TDTU FUTURE Library)",
    answer: 3
  },
  {
    question: "Trường Đại học Tôn Đức Thắng có bao nhiêu ký túc xá?",
    choice1: "1",
    choice2: "3",
    choice3: "4",
    choice4: "2",
    answer: 4
  },
  {
    question: "Trường Đại học Tôn Đức Thắng có một phân hiệu ở miền Trung được đặt tại thành phố nào?",
    choice1: "Quy Nhơn",
    choice2: "Nha Trang",
    choice3: "Huế",
    choice4: "Đà Nẵng",
    answer: 2
  }
];

//CONSTANTS
const MAX_QUESTIONS = 5;

// Start Game & Timer
startGame = () => {
  questionCounter = 0;
  score = 0; // Bắt đầu từ 0 điểm
  availableQuesions = [...questions];
  getNewQuestion();

  // Timer
  setInterval(function () {
  }, 1000);
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Get Answers
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Get User's Choice
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(); // Tăng điểm nếu trả lời đúng
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

//Increase Score for correct choice
incrementScore = () => {
  score++;
  scoreText.innerText = score;
};

startGame();