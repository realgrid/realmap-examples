<!-- html 타입 annotation에 사용할 템플릿 컴포넌트. -->
<!-- templates prop으로 전달하면 RealMapVue가 body 밑에 렌더링하고, -->
<!-- annotations의 `html: '#myTemplate'`가 이 DOM을 지도 위 원하는 위치에 표시한다. -->
<script setup lang="ts"></script>

<template>
    <div
        style="
            padding: 12px 16px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            font-size: 13px;
            text-align: left;
        "
    >
        <strong>버블 안내</strong>
        <p style="margin: 4px 0 0">버블 크기는 value 값에 비례합니다.</p>
    </div>
</template>
