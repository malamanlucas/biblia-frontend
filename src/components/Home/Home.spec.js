// import { mount } from 'avoriaz'
import { shallow } from 'vue-test-utils'
import Home from '@/components/Home'
import { HOME } from '@/paths'

describe('Home.vue', () => {
  it(`should has name: 'home'`, () => expect(shallow(Home).name()).to.equals('home'))

  describe('in route:', () => {
    it(`${HOME.name} should slot `, () => {
      const wrapper = shallow(Home)
      // expect(wrapper.name()).to.equals('home')
    })
  })
})
