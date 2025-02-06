import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import HomePage from '@/pages/HomePage.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import ShowCard from '@/components/shows/ShowCard.vue'
import LoadingIndicator from '@/components/common/LoadingIndicator.vue'
import { useShowsListing } from '@/composable/useShowsListing'
import { shows } from '@/mocks/shows'

vi.mock('@/composable/useShowsListing', () => {
  return {
    useShowsListing: vi.fn()
  }
})

function createWrapper() {
  return mount(HomePage)
}

describe('HomePage.vue', () => {
  let mockUseShowsListing: any
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    mockUseShowsListing = {
      sortedGenres: [['Drama', [shows[0]]]],
      isLoading: false,
      isSearching: false,
      errorMessage: '',
      searchQuery: { value: '' },
      hasError: false
    }

    useShowsListing.mockReturnValue(mockUseShowsListing)
    wrapper = createWrapper()
  })

  it('renders the search bar', () => {
    const searchBar = wrapper.findComponent(SearchBar)
    expect(searchBar.exists()).toBe(true)
  })

  it('shows empty state when there are no shows', () => {
    mockUseShowsListing.sortedGenres = []
    wrapper = createWrapper()

    expect(wrapper.findComponent(EmptyState).exists()).toBe(true)
  })

  it("displays an error message when there's an error", async () => {
    mockUseShowsListing.errorMessage = 'Something went wrong'
    mockUseShowsListing.hasError = true
    wrapper = createWrapper()

    expect(wrapper.get('[data-test="error-message"]').text()).toBe('Something went wrong')
  })

  it('shows loading indicator when loading', () => {
    mockUseShowsListing.isLoading = true
    wrapper = createWrapper()

    expect(wrapper.findComponent(LoadingIndicator).exists()).toBe(true)
  })

  it('renders shows grouped by genre', () => {
    mockUseShowsListing.sortedGenres = [
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
    mockUseShowsListing.sortedGenres = [['Drama', [shows[0]]]]
    wrapper = createWrapper()

    const showCards = wrapper.findAllComponents(ShowCard)
    expect(showCards.length).toBe(1)
    expect(showCards[0].props('show')).toEqual(shows[0])
  })

  it('triggers a search when typing in the search bar', () => {
    mockUseShowsListing.sortedGenres = [['Drama', [shows[0]]]]
    wrapper = createWrapper()

    const searchBar = wrapper.findComponent(SearchBar)
    expect(searchBar.exists()).toBe(true)

    searchBar.vm.$emit('search', 'Person of Interest')
    expect(mockUseShowsListing.searchQuery.value).toBe('Person of Interest')
  })
})
