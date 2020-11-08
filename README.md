# 환대의 조각

### 설명
디스트리부시(distribusi)를 커스텀하기 위한 레포지토리입니다.
작업을 빠르게 하기 위해서 디스트리부시를 직접 설치해서 사용하기보다는
glitch.com에서처럼 스크립트를 그대로 실행시키는 방식으로 작동합니다.
`distribusi/distribusi`폴더 안에 있는 코드를 수정하고
root폴더에 위치한 `test.sh`를 실행시키면 `test_data`안에 있는
파일들을 곧바로 렌더링합니다. 폴더 안에는 현재 다른 분들이 올려주신
다양한 데이터들을 다운로드 받은 것들이 있습니다. (혹시 문제가 된다면 알려주세요!)

작업할 때는 각자 자신의 브랜치를 만들어주시고, (예를들면 `feature/peer-tube`)
작업중인 부분이 완료되면 master branch로 작업한 branch를 merge해주세요!
만약 충돌하는 부분이 생기면, 함께 이야기하고 해결하면 좋을 것 같아요.

컴퓨터에 conda가 설치되어 있다면 바로 init.sh을 누르면
모든 필요한 라이브러리가 설치될 것이고,
test.sh를 누르면 index.html이 생기는 것을 보실 수 있을 것입니다!
혹시 제대로 되지 않으면 말씀해주세요!

- /test_data에는 [cloud](https://cloud.dianaband.info)처럼 사용자의 데이터(저희가 시험해볼 것들)가 있습니다.
- /distribusi는 저희가 개조할 라이브러리 파일들이 있습니다.
- /src는 웹작업을 위한 리소스가 들어갈 예정입니다


### 작업하기
1. [conda](https://www.anaconda.com/download/)를 컴퓨터에 설치하고 아래와 같이 가장 환경을 만들고 실행시켜줍니다.
```
conda create -n foh python=3.8
conda activate foh
```
2. `init.sh`을 실행시켜서 라이브러리를 설치해줍니다. (윈도우cmd라면 확장자를 .bat로 바꾼 뒤 실행시켜주세요)
3. `test.sh`을 실행시켜줍니다.(마찬가지로, 윈도우라면 .bat로 변경!)

#### Mac
```
conda activate foh
sh test.sh
```

#### Windows
```
conda activate foh
sh test.bat #파일 확장자를 변경해준 후
```

4. 이제 `distribusi/distribusi`에 들어가서 코드를 수정해주세요!
