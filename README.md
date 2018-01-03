# React Modal

> React 16 이상 버전만 지원합니다.  IE 11 이상만 지원합니다. 크롬, 사파리, 파이어폭스, IE 11 에서 테스트하였습니다.

- 여러 개의 모달을 순차적으로 제어할 수 있습니다.
- 모달 코드 순서와 상관없이 마지막에 활성화된 모달이 최상위에 노출됩니다.
- 모달 상태에 따라 임의적인 함수를 실행할 수 있습니다.
- 모달을 중앙 혹은 원하는 좌표 위치에 배치할 수 있습니다.
- esc 키를 이용하여 모달 닫을 수 있습니다.
- 브라우저보다 모달 높이가 클 경우 스크롤을 이용할 수 있습니다.

- Deprecated ~~여러 개의 모달중 선택된 모달을 최상위에 노출됩니다.~~

DEMO : http://syakuis.github.io/demo/react-modal

## Install

```
$ npm install react-modal-syaku

or

$ yarn add react-modal-syaku


import Modal, { GroupModal } from 'react-modal-syaku';
import 'react-modal-syaku/dist/react-modal.css';
```

## 옵션

`./src/demo/index.js` 참고하세요.

```

<Modal
  isOpen={this.state.isOpen}
  onClose={this.onClose}
>
  <div>...</div>
</Modal>


// default props
{
  isOpen: false, // required
  onClose: null, // required 모달을 닫을때 사용되는 함수.

  className: '', // .modal-wrapper node 에 class 를 추가한다.
  style: {}, // .modal-wrapper node 에 style 를 추가한다.
  containerClassName: null, // .modal-container node 에 class 를 추가한다.
  containerStyle: {}, // .modal-container node 에 style 를 추가한다.

  width: '50%',
  height: null,
  top: null, // null 이 아니면 center 옵션이 무시된다.
  left: null, // null 이 아니면 center 옵션이 무시된다.
  right: null,
  bottom: nunll,
  isCenter: true,
  isCloseButton: true, // 내부 close 버튼을 표시한다.
  isEscClose: true,

  overlayClassName: null,
  overlayStyle: {},

  zIndex: 3000,

  afterOpen: null,
  beforeOpen: null,
  doneClose: null,
};
```

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
onClose() {
  // bad
  this.setState({ isOpen: !this.state.isOpen });

  // good
  this.setState({ isOpen: false });
}
```

`onRequestClose` 는 모달을 닫기 위한 함수입나다. 사용에 주의하세요.

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

