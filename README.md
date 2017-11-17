# React Modal

> React 16 이상 버전만 지원합니다.  IE 11 이상만 지원합니다. 크롬, 사파리, 파이어폭스, IE 11 에서 테스트하였습니다.

- 여러 개의 모달을 함께 혹은 개별적으로 제어할 수 있습니다.
- 여러 개의 모달중 선택된 모달을 최상위에 노출됩니다.
- 모달 코드가 순서와 상관없이 마지막에 활성화된 모달이 최상위에 노출됩니다.
- 모달 상태에 따라 이벤트 트리거 (EventListener) 를 사용할 수 있습니다.
- 모달을 중앙 혹은 원하는 좌표 위치에 배치할 수 있습니다.
- esc 키를 이용하여 모달 닫을 수 있습니다.

DEMO : http://syakuis.github.io/demo/react-modal

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/dBWe5x6v050/0.jpg)](https://youtu.be/dBWe5x6v050)

### 주의

```
<Modal id=1>
  <Modal id=2 />
</Modal>

<Modal id=3>
  <button type="button" className="btn btn-default" onClick={() => { this.onOpen('id=2'); }}>
</Modal>

// 해결방법
<button type="button" className="btn btn-default" onClick={() => { this.onOpen('id=1'); this.onOpen('id=2'); }}>
```

위와 같이 `id=3`이 `id=1`에 속한 `id=2`를 바로 열 수 없습니다. `id=1`을 열고 `id=2`를 열 수 있습니다.

```
onRequestClose() {
  // bad
  this.setState({ isOpen: !this.state.isOpen });

  // good
  this.setState({ isOpen: false });
}
```

`onRequestClose` 는 모달을 닫기 위한 함수입나다. 사용에 주의하세요.

## Install

```
$ npm install react-modal-syaku

or

$ yarn add react-modal-syaku


import Modal, { GroupModal } from 'react-modal-syaku';
import 'react-modal-syaku/dist/react-modal.css';
```

## 일반 모달

`./src/demo/index.js & ./src/demo/ModalConatiner.js` 참고하세요.

```
// default props
{
  className: '',
  style: {},
  width: '50%',
  height: 'auto',
  left: null, // null 이 아니면 center 옵션이 무시된다.
  top: null, // null 이 아니면 center 옵션이 무시된다.
  center: true,
  isCloseButton: true, // 내부 close 버튼을 표시한다.
  isEscClose: true,
  isOpen: false,
  onRequestClose: null, // 모달을 닫을때 사용되는 함수. onRequestClose 에서 isOpen 이 false 가 되도록 해야한다.

  isOverlay: true, // 모달 배경 사용여부
  overlayClassName: null,
  overlayStyle: {},

  zIndex: 3000,

  afterOpen: null,
  beforeOpen: null,
  doneClose: null,
};

<Modal {...props}>
  <div>...</div>
</Modal>
```

## 다중 모달

```
// default props
{
  isOverlay: true, // 배경 모달 사용여부
  overlayClassName: null,
  overlayStyle: {},

  zIndex: 3000,
}

<GroupModal {...props}>
  <Modal {...props}>
    <div>...</div>
  </Modal>
  <Modal {...props}>
    <div>...</div>
  </Modal>
</GroupModal>
```

GroupModal 컴포넌트 자식은 오직 Modal 컴포넌트만 가질 수 있다.

## dev server start

```
// dev
$ yarn serv:dev

```

http://localhost:8088

## build

```
$ yarn build:prod
```

