import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import HomePage from '@/pages/HomePage.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import ShowCard from '@/components/shows/ShowCard.vue'
import LoadingIndicator from '@/components/common/LoadingIndicator.vue'
import { shows } from '@/mocks/shows'

const mockShowsListing = {
  sortedGenres: [['Drama', [shows[0]]]],
  isLoading: false,
  isSearching: false,
  errorMessage: '',
  searchQuery: '',
  hasError: false,
  fetchShowDetails: vi.fn().mockResolvedValue(shows[0])
}

vi.mock('@/composable/useShowsListing', () => ({
  useShowsListing: () => mockShowsListing
}))

function createWrapper() {
  return mount(HomePage, {
    global: {
      stubs: {
        'router-link': {
          template: '<a><slot /></a>',
        },
      },
    },
  })
}

describe('HomePage.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    mockShowsListing.sortedGenres = [['Drama', [shows[0]]]]
    mockShowsListing.isLoading = false
    mockShowsListing.isSearching = false
    mockShowsListing.errorMessage = ''
    mockShowsListing.searchQuery = ''
    mockShowsListing.hasError = false
    wrapper = createWrapper()
  })

  it('renders the search bar', () => {
    const searchBar = wrapper.findComponent(SearchBar)
    expect(searchBar.exists()).toBe(true)
  })

  it('shows empty state when there are no shows', () => {
    mockShowsListing.sortedGenres = []
    wrapper = createWrapper()

    expect(wrapper.findComponent(EmptyState).exists()).toBe(true)
  })

  it("displays an error message when there's an error", async () => {
    mockShowsListing.errorMessage = 'Something went wrong'
    mockShowsListing.hasError = true
    wrapper = createWrapper()

    expect(wrapper.get('[data-test="error-message"]').text()).toBe('Something went wrong')
  })

  it('shows loading indicator when loading', () => {
    mockShowsListing.isLoading = true
    wrapper = createWrapper()

    expect(wrapper.findComponent(LoadingIndicator).exists()).toBe(true)
  })

  it('renders shows grouped by genre', () => {
    mockShowsListing.sortedGenres = [
      ['Drama', [shows[0]]],
      ['Action', [shows[1]]]
    ]
    wrapper = createWrapper()

    const genreSections = wrapper.findAll('[data-test="genre-section"]')
    expect(genreSections.length).toBe(2)
    expect(genreSections[0].find('h2').text()).toBe('Drama')
    expect(genreSections[1].find('h2').text()).toBe('Action')
  })

  it('renders ShowCard components correctly', () => {
    mockShowsListing.sortedGenres = [['Drama', [shows[0]]]]
    wrapper = createWrapper()

    const showCards = wrapper.findAllComponents(ShowCard)
    expect(showCards.length).toBe(1)
    expect(showCards[0].props('show')).toEqual(shows[0])
  })
})