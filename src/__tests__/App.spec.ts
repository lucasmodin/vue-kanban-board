import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'
import ColumnItem from '@/ColumnItem.vue'

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App)
    const columns = wrapper.findAllComponents(ColumnItem)
    expect(columns).toHaveLength(4)
  })
})
