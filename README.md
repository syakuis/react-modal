# React Modal

> React 16 이상 버전만 지원합니다.  IE 11 이상만 지원합니다. 크롬, 사파리, 파이어폭스, IE 11 에서 테스트하였습니다.

- 1.3.7 : React state 사용하지 않고 mobx state 를 사용합니다.
- 여러 개의 모달을 순차적으로 제어할 수 있습니다.
- 모달 코드 순서와 상관없이 마지막에 활성화된 모달이 최상위에 노출됩니다.
- 모달 상태에 따라 임의적인 함수를 실행할 수 있습니다.
- 모달을 중앙 혹은 원하는 좌표 위치에 배치할 수 있습니다.
- esc 키를 이용하여 모달 닫을 수 있습니다.
- 브라우저보다 모달 높이가 클 경우 스크롤을 이용할 수 있습니다.

DEMO : http://syakuis.github.io/demo/react-modal

[![Edit react modal demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/l943kvr237)

## Install

`react, react-dom, mobx, mobx-react` 패키지가 필요합니다.

```
$ npm install react-modal-syaku

or

$ yarn add react-modal-syaku


import { Modal, createId, open, close } from 'react-modal-syaku';
import 'react-modal-syaku/dist/react-modal.css';
```

## 옵션

`./src/demo/index.js` 참고하세요.

```

this.id = createId(); // random id

// 대상 모달
<Modal
  id="modal01" // this.id
  onClose={this.onClose}
>
  <div>...</div>
</Modal>

// 대상 모달 열기
<button type="button" className="btn btn-default" onClick={() => { open(this.id); }}>Open</button>


// default props
{
  isOpen: false,
  onClose: null, // 모달을 닫을때 사용되는 함수.

  className: '', // .modal-wrapper node 에 class 를 추가한다.
  style: {}, // .modal-wrapper node 에 style 를 추가한다.
  containerClassName: null, // .modal-container node 에 class 를 추가한다.
  containerStyle: {}, // .modal-container node 에 style 를 추가한다.

  width: '50%',
  height: null,
  top: null, // null 이 아니면 center 옵션이 무시된다.
  left: null, // null 이 아니면 center 옵션이 무시된다.
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

## dev server start

```
// dev
$ yarn serv:dev
```

http://localhost:8089

## build

```
$ yarn build:prod
```

