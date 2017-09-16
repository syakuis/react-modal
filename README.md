# React Modal

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/dBWe5x6v050/0.jpg)](https://youtu.be/dBWe5x6v050)

- 여러개의 모달을 단계적으로 활성화 한다.
- 여러개 모달을 활성화되면 모달들은 그룹화되며 배경은 1개만 활성화 된다. 각 모달을 선택하면 맨 앞으로 이동된다.
- Event Trigger 를 지원한다.

```
afterOpen: PropTypes.func,
beforeOpen: PropTypes.func,
doneClose: PropTypes.func,
```
- 모달을 중앙 혹은 원하는 위치에 활성화한다.

## DEMO

```
$ npm run serv:demo
```

http://localhost:8088

## build

```
$ npm run build:prod
```

