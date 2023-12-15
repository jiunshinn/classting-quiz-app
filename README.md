[필수 구현]

- [x] 사용자는 '퀴즈 풀기' 버튼을 클릭하여 퀴즈 풀기를 시작할 수 있다.

- [x] 사용자는 문항에 대한 답안을 4개 보기 중에 선택할 수 있다.
- [x] 사용자는 답안을 선택하면 다음 문항을 볼 수 있다.
  - [x] 답안 선택 후 다음 문항 버튼을 볼 수 있다.
  - [x] 답안이 맞았는지 틀렸는지 바로 알 수 있다.
  - [x] 다음 문항 버튼을 클릭하여 다음 문항으로 이동할 수 있다.
- [x] 모든 문항을 다 풀면 사용자는 다음과 같은 결과 정보를 볼 수 있다.
  - [x] 퀴즈를 마칠 때까지 소요된 시간
  - [x] 정답 개수
  - [x] 오답 수

[추가 구현]

- [x] 정 오답에 대한 비율을 차트로 표기
- [x] 다시 풀기
- [x] 오답 노트

- [x] 퀴즈 정보 못가져왔을때 재시도
- [x] 퀴즈 푸는 도중 홈화면으로 백버튼, 화면이동, 앱 종료 처리
- [x] 디자인 업데이트

<br/>

### 실행방법

<br/>

```
git clone git@github.com:jiun-dev/classting-quiz-app.git
or
git clone https://github.com/jiun-dev/classting-quiz-app.git
cd classting-quiz-app
npm install

cd ios && pod install && cd ..
npm run start
```

iphone 빌드(metro 실행 중)

```
npm run ios
```

ios 시뮬레이터 iphone15가 설치되어 있는경우(metro 실행 중)

```
npm run iphone
```

android 빌드(metro 실행 중)

```
npm run android
```
