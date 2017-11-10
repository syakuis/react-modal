# React Modal

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/dBWe5x6v050/0.jpg)](https://youtu.be/dBWe5x6v050)

React 16 이상 버전만 지원합니다.

- 여러개의 모달을 단계적으로 활성화 한다.
- 모달들은 그룹화되며 배경은 1개만 활성화 된다. 모달을 선택하면 맨 앞으로 이동된다.
- Event Trigger 를 지원한다.
- 모달을 중앙 혹은 원하는 위치에 배치할 수 있다.
- esc 키를 이용한 모달 닫기 (개발중...)

### 주의

```
<Modal id=1>
  <Modal id=2 />
</Modal>

<Modal id=3>
  <button type="button" className="btn btn-default" onClick={() => { this.onOpen('id=2'); }}>
</Modal>

// 해결
<button type="button" className="btn btn-default" onClick={() => { this.onOpen('id=1'); this.onOpen('id=2'); }}>
```

위와 같이 modal id 3번이 modal id 1 속에 있는 id 2를 바로 열 수 없습니다. id 1 번을 열고 2번을 열 수 있습니다.

## Install

```
$ npm install react-modal-syaku

or

$ yarn add react-modal-syaku
```

## 일반 모달

`./src/demo/index.js & ./src/demo/ModalConatiner.js` 참고하세요.

```
import Modal from 'react-modal-syaku';

<Modal {...props}>
  <div>...</div>
</Modal>
```

## 다중 모달

```
import Modal from 'react-modal-syaku';

<GroupModal {...props}>
  <Modal {...props}>
    <div>...</div>
  </Modal>
  <Modal {...props}>
    <div>...</div>
  </Modal>
</GroupModal>
```


## setting

```
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

  // 배경
  isOverlay: PropTypes.bool,

  // event trigger
  afterOpen: PropTypes.func,
  beforeOpen: PropTypes.func,
  doneClose: PropTypes.func,
};

const defaultProps = {
  className: '',
  style: {},
  width: '50%',
  height: 'auto',
  left: '0',
  top: '0',
  center: true,
  isCloseButton: true,
  isOpen: false,
  onRequestClose: null,

  isOverlay: true,

  afterOpen: null,
  beforeOpen: null,
  doneClose: null,
};
```

## demo

```
// dev
$ npm run serv:dev

// demo
$ npm run serv:demo
```

http://localhost:8088

## build

```
$ npm run build:prod
```

