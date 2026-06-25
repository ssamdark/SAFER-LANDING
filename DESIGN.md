# SaferLanding — 코딩 규칙서

디자인 토큰의 원천은 `variables.css` 하나입니다.
이 문서는 그 토큰을 **어떻게 써야 하는지** 규칙을 정의합니다.

---

## 1. 토큰 사용 원칙

- **색상, 폰트, 간격, 반경은 반드시 `variables.css`의 CSS 변수를 사용한다.**
- 하드코딩 금지: `color: #202020` (X) → `color: var(--color-midnight-ink)` (O)
- 단, 대시보드·애니메이션 등 컴포넌트 내부 고유값(예: 차트 색상)은 예외.

---

## 2. 폰트

| 용도 | 변수 | 실제 폰트 |
|------|------|-----------|
| 한글 본문·UI 전반 | `--font-korean` | Pretendard |
| 영문 강조·디스플레이 | `--font-display` | Poppins |

- 한글이 포함된 모든 텍스트는 `--font-korean` 사용.
- 섹션 제목 등 영문 강조 표현에만 `--font-display` 사용.

---

## 3. 색상

색상 값은 `variables.css`가 원천이다. 코드에서 직접 헥스값을 쓰지 않는다.

### Primary (`#4A67E4` 기반)

| 토큰 | 값 | 용도 |
|------|----|------|
| `--primary-50` | `#EEF1FD` | 배경 강조, hover 영역 |
| `--primary-100` | `#D5DCFA` | 비활성 뱃지, 연한 fill |
| `--primary-300` | `#8FA3EF` | 아이콘, 보조 강조 |
| `--primary-500` | `#4A67E4` | **BASE** — 버튼, 링크, 주 액션 |
| `--primary-700` | `#3450B8` | hover·눌림 상태 |
| `--primary-900` | `#1D2E6E` | 텍스트 강조, 다크 배경 |

### Gray (쿨 그레이)

| 토큰 | 값 | 용도 |
|------|----|------|
| `--gray-50` | `#F8F9FB` | 페이지 배경 |
| `--gray-100` | `#F0F2F6` | 카드·섹션 배경 |
| `--gray-200` | `#E2E6ED` | 구분선, 테두리 |
| `--gray-300` | `#C8D0DC` | 비활성 테두리 |
| `--gray-400` | `#9AA5B8` | placeholder, 비활성 아이콘 |
| `--gray-500` | `#6B7A91` | 보조 텍스트 (연한) |
| `--gray-600` | `#4A5568` | 보조 텍스트 (진한) |
| `--gray-700` | `#2D3748` | 소제목 |
| `--gray-900` | `#111827` | 기본 본문 텍스트 |

### Status Colors

| 토큰 | 값 | 용도 |
|------|----|------|
| `--color-warning` | `#F08C00` | 주의·경고 텍스트 |
| `--color-warning-bg` | `rgba(240,140,0,0.10)` | 경고 뱃지 배경 |
| `--color-warning-border` | `rgba(240,140,0,0.25)` | 경고 뱃지 테두리 |
| `--color-danger` | `#E03131` | 위험·오류 |
| `--color-success` | `#2F9E44` | 정상·완료 |

### Semantic (기존 코드 호환)

| 토큰 | 참조 | 용도 |
|------|------|------|
| `--color-midnight-ink` | `--gray-900` | 기본 텍스트 |
| `--color-cloud-canvas` | `--gray-100` | 섹션·카드 배경 |
| `--color-paper-white` | `#ffffff` | 컴포넌트 내부 배경 |
| `--color-muted-ash` | `--gray-600` | 보조 텍스트 |
| `--color-ghost-border` | `--gray-200` | 테두리·구분선 |
| `--color-electric-blue` | `--primary-500` | 주요 액션 |

---

## 4. 간격 (Spacing)

`variables.css`에 정의된 스케일만 사용한다.
`4 / 8 / 16 / 20 / 24 / 32 / 40 / 48 / 80 / 88 / 96 / 176px`

- 스케일에 없는 임의 값은 컴포넌트 내부 미세 조정에만 허용.
- 섹션 상하 패딩은 `--spacing-48` 이상 사용 권장.

---

## 5. 테두리 반경 (Border Radius)

| 토큰 | 값 | 용도 |
|------|----|------|
| `--radius-default` | `8px` | 카드, 일반 요소 |
| `--radius-inputs` | `10px` | 입력 필드 |
| `--radius-images` | `12px` | 이미지 |
| `--radius-full` | `1425.6px` | 버튼 (pill) |

---

## 6. 금지 사항

- `@import` 중복 사용 금지 — `variables.css`는 `style.css` 상단에서 한 번만 로드.
- 인라인 스타일(`style=""`)에 디자인 토큰 값 직접 입력 금지.
- 새 색상·폰트·간격을 임의로 추가하지 않는다. 필요하면 `variables.css`에 먼저 토큰을 추가한 뒤 사용.
- `!important` 남용 금지.
