# Fireboard (Telegram Events Board)

버튼 한 번으로 텔레그램 이벤트 참여 링크로 이동하는 “이벤트 게시판” MVP.

## 1) 로컬 실행
1. 이 폴더에서 터미널 열기
2. 아래 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 열기

## 2) 환경변수
루트에 `.env.local` 파일을 만들고 아래 3개를 채우세요.

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_SITE_URL (로컬은 http://localhost:3000)

## 3) Supabase 테이블
`events` 테이블이 필요합니다. (대화에서 제공한 SQL 사용)

## 4) 배포(Vercel)
Vercel 프로젝트 설정에서 위 환경변수를 그대로 등록하세요.
