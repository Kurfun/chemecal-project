<template>
  <div class="app-wrapper">
    <!-- 首頁 -->
    <HomeView
      v-if="currentPage === 'home'"
      @navigate="navigate"
    />

    <!-- 有機化學：配對遊戲 -->
    <SubPage
      v-else-if="currentPage === 'organic'"
      title="有機化學"
      @navigate="navigate"
    >
      <OrganicMatch />
    </SubPage>

    <!-- 無機化學：點群互動檢視器 -->
    <SubPage
      v-else-if="currentPage === 'inorganic'"
      title="無機化學"
      @navigate="navigate"
    >
      <ChemingoViewer />
    </SubPage>

    <!-- 分析化學：暫無資料 -->
    <SubPage
      v-else-if="currentPage === 'analytical'"
      title="分析化學"
      @navigate="navigate"
    />

    <!-- 藥用化學：單字卡 -->
    <SubPage
      v-else-if="currentPage === 'pharma'"
      title="藥用化學"
      @navigate="navigate"
    >
      <PharmaFlashCard />
    </SubPage>

    <!-- 成果分析 -->
    <SubPage
      v-else-if="currentPage === 'results'"
      title="成果分析"
      @navigate="navigate"
    >
      <ResultsPage />
    </SubPage>

    <!-- 換頁過場 -->
    <div class="transition-overlay" :class="{ active: transitioning }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, provide } from 'vue'
import HomeView        from './HomeView.vue'
import SubPage         from './SubPage.vue'
import OrganicMatch    from './OrganicMatch.vue'
import PharmaFlashCard from './PharmaFlashCard.vue'
import ResultsPage     from './ResultsPage.vue'
import ChemingoViewer  from './ChemingoViewer.vue'
import { PAGE_TITLES } from './types'
import { VISITS_KEY, createVisits, type Visits } from './useVisits'

// 可計數的頁面 key
const COUNTABLE = new Set<string>(['organic', 'inorganic', 'analytical', 'pharma'])

export default defineComponent({
  name: 'App',
  components: { HomeView, SubPage, OrganicMatch, PharmaFlashCard, ResultsPage, ChemingoViewer },
  setup() {
    const currentPage   = ref<string>('home')
    const transitioning = ref<boolean>(false)

    // ── 全域點擊計數，provide 給子孫元件（ResultsPage 用 inject 讀取）
    const visits = createVisits()
    provide(VISITS_KEY, visits)

    const currentPageTitle = computed(
      () => PAGE_TITLES[currentPage.value] ?? ''
    )

    function navigate(page: string) {
      // 進入四個主題方塊時 +1
      if (COUNTABLE.has(page)) {
        visits.value[page as keyof Visits]++
      }

      transitioning.value = true
      setTimeout(() => {
        currentPage.value   = page
        transitioning.value = false
      }, 250)
    }

    return { currentPage, currentPageTitle, transitioning, navigate }
  }
})
</script>

<style>
/* ── 全域 ────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: #f4f1ea;
  font-family: 'Noto Serif TC', 'Georgia', serif;
}

.app-wrapper {
  position: relative;
  width: 100%;
  min-height: 100dvh;
  background: #f4f1ea;
  overflow: hidden;
}

/* ── 過場遮罩 ────────────────────────────────────────── */
.transition-overlay {
  position: fixed;
  inset: 0;
  background: #1a3a6e;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
  z-index: 999;
}
.transition-overlay.active {
  opacity: 0.15;
  pointer-events: all;
}
</style>