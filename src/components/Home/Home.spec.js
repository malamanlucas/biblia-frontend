import { shallow, createLocalVue } from 'vue-test-utils'
import HomeComponent from '@/components/Home'
import { HOME } from '@/paths'
import router from '@/router'

let wrapper

describe('Home.vue', () => {
  beforeEach(() => {
    const localVue = createLocalVue()
    wrapper = shallow(HomeComponent, {
      attachToDocument: true,
      localVue,
      router
    })
  })

  afterEach(() => wrapper.destroy())

  const homeName = 'home'
  it(`should has name: ${homeName}`, () => expect(wrapper.name()).to.equals(homeName))

  describe('in route:', () => {
    it(`When push: ${HOME.path} should name/path be equals ${HOME.name}/${HOME.path}`, () => {
      console.log(HOME)
      wrapper.vm.$router.push(HOME)
      console.log(wrapper.vm.$route)
      // const wrapper = shallow(Home)
      // expect(wrapper.name()).to.equals('home')
    })
  })
})
