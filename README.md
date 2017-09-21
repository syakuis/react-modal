# React Modal

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/dBWe5x6v050/0.jpg)](https://youtu.be/dBWe5x6v050)

- 여러개의 모달을 단계적으로 활성화 한다.
- 여러개 모달을 활성화되면 모달들은 그룹화되며 배경은 1개만 활성화 된다. 각 모달을 선택하면 맨 앞으로 이동된다.
- Event Trigger 를 지원한다.
- 모달을 중앙 혹은 원하는 위치에 활성화한다.

## Install

```
$ npm install react-modal-syaku

or

$ yarn add react-modal-syaku
```

## setting

`./src/demo/index.js & ./src/demo/ModalConatiner.js` 참고하세요.

```
import Modal from 'react-modal-syaku';

<Modal {...props}>
  <div>...</div>
</Modal>

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
  width: PropTypes.string,
  height: PropTypes.string,
  left: PropTypes.string,
  top: PropTypes.string,
  center: PropTypes.bool,
  isOpen: PropTypes.bool,
  isCloseButton: PropTypes.bool,
  onRequestClose: PropTypes.func,

  // modal 을 그룹으로 만든다.
  group: PropTypes.string,

  // 배경
  isOverlay: PropTypes.bool,

  // event trigger
  afterOpen: PropTypes.func,
  beforeOpen: PropTypes.func,
  doneClose: PropTypes.func,
};

const defaultProps = {
  className: '',
  style: undefined,
  width: '50%',
  height: 'auto',
  left: '0',
  top: '0',
  center: true,
  isCloseButton: true,
  isOpen: false,
  onRequestClose: null,

  group: undefined,
  isOverlay: true,

  afterOpen: null,
  beforeOpen: null,
  doneClose: null,
};
```

## demo

```
$ npm run serv:demo
```

http://localhost:8088

## build

```
$ npm run build:prod
```

