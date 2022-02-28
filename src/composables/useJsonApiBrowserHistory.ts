import { ref, onMounted, onUnmounted } from 'vue'

type JsonApiBrowserHistoryState = {
  type: 'HISTORY_STATE_TYPE',
  location: string
}

const isJsonApiBrowserHistoryState = function (object: any): object is JsonApiBrowserHistoryState {
  return typeof object === 'object'
    && object !== null
    && object.type === 'HISTORY_STATE_TYPE'
    && typeof object.location === 'string'
}

export function useJsonApiBrowserHistory(
  onHistoryChange: (location: string) => void
) {
  function pushState (location: string) {
    window.history.pushState({ type: 'HISTORY_STATE_TYPE', location }, '')
  }

  function onPopState (event: PopStateEvent) {
    if (isJsonApiBrowserHistoryState(event.state)) {
      onHistoryChange(event.state.location)
    }
  }

  onMounted(() => {
    window.addEventListener('popstate', onPopState)
    // Handle browser refresh.
    if (isJsonApiBrowserHistoryState(window.history.state)) {
      onHistoryChange(window.history.state.location)
    }
  })

  onUnmounted(() => {
    window.removeEventListener('popstate', onPopState)
  })

  return {
    pushState
  }
}
