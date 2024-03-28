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
    answer: 4
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
  },
  {
    question: "Thư viện của đại học Tôn Đức Thắng có tổng chi phí xây dựng là bao nhiêu?",
    choice1: "129 tỷ",
    choice2: "5 tỷ",
    choice3: "500.000 đô",
    choice4: "Nhà nước đầu tư (vì mục đích nâng cao tri thức cho thế hệ trẻ)",
    answer: 2
  },
  {
    question: "Phân hiệu trường Đại học Tôn Đức Thắng ở tỉnh Lâm Đồng chính xác nằm ở đâu?",
    choice1: "Huyện Bảo Lâm",
    choice2: "Huyện Lâm Hà",
    choice3: "Huyện Di Linh",
    choice4: "Thành phố Bảo Lộc",
    answer: 4
  },
  {
    question: "Phân hiệu của trường Đại học Tôn Đức Thắng không nằm ở tỉnh nào dưới đây?",
    choice1: "Tỉnh Phú Yên",
    choice2: "Tỉnh Lâm Đồng",
    choice3: "Tỉnh Cà Mau",
    choice4: "Tỉnh Khánh Hòa",
    answer: 1
  },
  {
    question: "Màu logo của trường Đại học Tôn Đức Thắng bao gồm?",
    choice1: "Đỏ, xanh biển và trắng",
    choice2: "Đỏ và đen",
    choice3: "Đỏ và xanh biển",
    choice4: "Cam, đỏ và xanh biển",
    answer: 3
  },
  {
    question: "Áo dài của sinh viên nữ trường Đại học Tôn Đức Thắng có màu gì?",
    choice1: "Cam",
    choice2: "Hồng",
    choice3: "Tím",
    choice4: "Xanh biển",
    answer: 2
  },
  {
    question: "Mã trường Đại học Tôn Đức Thắng là gì?",
    choice1: "DTT",
    choice2: "TDT",
    choice3: "TDTU",
    choice4: "DTTU",
    answer: 1
  },
  {
    question: "Tên của một câu lạc bộ chuyên về công nghệ thông tin và máy tính ở trường đại học Tôn Đức Thắng?",
    choice1: "IT-Zone",
    choice2: "SEEC",
    choice3: "TechCom",
    choice4: "8GB",
    answer: 1
  },
  {
    question: "Trường Đại học Tôn Đức Thắng có nhận kết quả bài thi đánh giá năng lực của ĐHQG TP.HCM?",
    choice1: "Không",
    choice2: "Có",
    answer: 2
  },
  {
    question: "Học sinh ứng tuyển các ngành của khoa Mỹ thuật Công Nghiệp phải bắt buộc thi môn năng khiếu gì?",
    choice1: "Vẽ",
    choice2: "Thanh nhạc",
    choice3: "Ngôn ngữ Trung",
    choice4: "Lập trình",
    answer: 1
  },
  {
    question: "Ngài Tôn Đức Thắng đã từng là chủ tịch nước thứ bao nhiêu của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam",
    choice1: "3",
    choice2: "2",
    choice3: "1",
    choice4: "Ngài là Tổng Bí Thư, không phải chủ tịch nước",
    answer: 3
  },
  {
    question: "Trường đại học Tôn Đức Thắng là",
    choice1: "Trường Đại học công lập tự chủ tài chính",
    choice2: "Trường Đại học tư",
    choice3: "Trường Đại học công lập",
    choice4: "Trường Đại học đào tạo liên doanh với chính phủ và bộ giáo dục",
    answer: 1
  },
  {
    question: "Trường đại học Tôn Đức Thắng không đào tạo ngành nào dưới đây",
    choice1: "Khoa học máy tính",
    choice2: "Vật lý lượng tử",
    choice3: "Công nghệ sinh học",
    choice4: "Kỹ thuật hóa học",
    answer: 2
  },
  {
    question: "Khoa Ngoại ngữ trường đại học Tôn Đức Thắng đào đào tạo ngành nào dưới đây",
    choice1: "Ngôn ngữ Tây Ban Nha",
    choice2: "Kỹ thuật ngôn ngữ tự nhiên",
    choice3: "Ngôn ngữ tuyến tính",
    choice4: "Ngôn ngữ Trung",
    answer: 4
  },
  {
    question: "Sinh viên khi học tại trường đại học Tôn Đức Thắng sẽ học tại phân hiệu nào",
    choice1: "Bảo Lộc",
    choice2: "Cà Mau",
    choice3: "Phú Yên",
    choice4: "Khánh Hòa",
    answer: 1
  },
  {
    question: "Tiền thân của trường đại học Tôn Đức Thắng là",
    choice1: "Cao đẳng Kỹ thuật Cao Thắng",
    choice2: "Cao đẳng Công nghệ Kinh tế Quận 7",
    choice3: "Trường Đại học Công nghệ Dân lập Tôn Đức Thắng",
    choice4: "Trường đại học Dân lập Tôn Đức Thắng",
    answer: 3
  },
  {
    question: "Phương thức xét tuyển của trường đại học Tôn Đức Thắng không có phương thức nào",
    choice1: "Điểm thi đánh giá năng lực của ĐHQG",
    choice2: "Xét số lượng giấy khen sinh giỏi 12 năm",
    choice3: "Điểm học ba THPT",
    choice4: "Điểm thi THPTQG",
    answer: 2
  },
  {
    question: "Môn bơi tại trường đại học Tôn Đức Thắng được học ở đâu",
    choice1: "Hồ bơi 778,5 m² với 6 làn bơi tại trường",
    choice2: "Hồ bơi Vân Đồn",
    choice3: "Bơi mô phỏng bằng màn hình 3D",
    choice4: "Chỉ học động tác, không cần xuống nước",
    answer: 1
  },
  {
    question: "Ngôi trường này được đặt theo tên của ngài Tôn Đức Thắng, ngài từng giữ chức vụ gì?",
    choice1: "Phó chủ tịch nước đầu tiên",
    choice2: "Tổng bí thư đầu tiên",
    choice3: "Chủ tịch nước đầu tiên",
    choice4: "Hiệu trưởng thành lập trường đầu tiên",
    answer: 3
  },
  {
    question: "Chữ D trong logo trường Đại học Tôn Đức Thắng có màu gì",
    choice1: "Cam",
    choice2: "Xanh",
    choice3: "Đỏ",
    choice4: "Tím",
    answer: 3
  },
  {
    question: "Đại học Tôn Đức Thắng có 1 phân hiệu ở đâu trong các địa điểm dưới này",
    choice1: "Gia Linh - Lâm Đồng",
    choice2: "Thành phố Nha Trang - Khánh Hòa",
    choice3: "Quận 7 - Thành phố Hồ Chí Minh",
    choice4: "Thành phố Cam Ranh - khánh Hòa",
    answer: 2
  },
  {
    question: "Đại học Tôn Đức Thắng thuộc top bao nhiêu ở BXH các trường đáng học nhất tại Việt Nam",
    choice1: "Top 5",
    choice2: "Top 3",
    choice3: "Top 100",
    choice4: "Top 50",
    answer: 2
  },
  {
    question: "Bài hát đại diện của trường Đại học Tôn Đức Thắng có tên là",
    choice1: "Hành khúc đại học Tôn Đức Thắng",
    choice2: "Đại học Tôn Đức Thắng - vì một tương lai tươi sáng",
    choice3: "Mái trường Tôn Đức Thắng thân yêu",
    choice4: "Vì một đại học Tôn Đức Thắng phồn vinh",
    answer: 1
  },
  {
    question: "Khoa Công nghệ Thông tin trường đại học Tôn Đức Thắng đào đào tạo ngành nào dưới đây",
    choice1: "Kỹ thuật lập trình",
    choice2: "Mạng neural và trí tuệ nhân tạo",
    choice3: "Mạng máy tính và truyền thông dữ liệu",
    choice4: "Kỹ thuật bảo mật",
    answer: 3
  },
  {
    question: "Trường đại học Tôn Đức Thắng không đào đào tạo ngành nào dưới đây",
    choice1: "Kỹ thuật vật liệu",
    choice2: "Kỹ thuật xây dựng",
    choice3: "Kiến trúc",
    choice4: "kỹ thuật phần mềm",
    answer: 1
  },
  {
    question: "Trường đại học Tôn Đức Thắng đào đào tạo ngành nào dưới đây",
    choice1: "Kinh tế quốc tế",
    choice2: "Kinh doanh quốc tế",
    choice3: "Quản trị kinh tế",
    choice4: "Kinh tế học",
    answer: 2
  },
  {
    question: "Khoa Quản trị Kinh doanh của Trường đại học Tôn Đức Thắng đào đào tạo ngành nào dưới đây",
    choice1: "Kinh tế quốc tế",
    choice2: "Kinh doanh quốc tế",
    choice3: "Quản trị kinh tế",
    choice4: "Kinh tế học",
    answer: 2
  },
  {
    question: "Chương trình học chất lượng cao 50% có nghĩa là",
    choice1: "50% học ca học phải nói tiếng anh và 50% còn lại nói tiếng việt",
    choice2: "50% chương trình học là tiếng Việt, 50% còn lại là tiếng anh",
    choice3: "Học thế nào cũng được",
    choice4: "Học với giáo viên nước ngoài nhưng học giảng bài bằng tiếng Việt",
    answer: 2
  },
  {
    question: "Khoa Khoa học Ứng dụng của Trường đại học Tôn Đức Thắng đào đào tạo ngành nào dưới đây",
    choice1: "Kỹ thuật y sinh",
    choice2: "Sinh học sự sống",
    choice3: "Kỹ thuật phân tích sinh học",
    choice4: "Công nghệ sinh học",
    answer: 4
  },

];

//CONSTANTS
const MAX_QUESTIONS = 10;

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

window.onload = function() {
  if (questionCounter === 0) {
     const audio = document.getElementById('backgroundMusic');
     audio.muted = false; // Unmute the audio
     audio.play(); // Play the audio
  }
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Câu hỏi ${questionCounter}/${MAX_QUESTIONS}`;

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
