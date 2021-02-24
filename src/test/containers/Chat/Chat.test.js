import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'

import { store, sampleMessages } from 'test/mockStore'
import { preferences } from 'test/preferenceUtil'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import Chat from 'containers/Chat'

describe('<Chat>', () => {

  it('should render empty', () => {
    const wrapper = shallow(<Chat store={store} />)
    expect(wrapper.find('div').exists()).to.equal(false)
  })

  it('should render', (done) => {
    const wrapper = mount(
      <Provider store={store} >
        <Chat
          show
          containerMessagesStyle={{ height: '500' }}
          footerStyle={{ height: '5.0rem' }}
          conversationId={'conversationId'}
          messages={sampleMessages}
          token={'tokenId'}
          channelId={'tokenId'}
          preferences={preferences} />
      </Provider>
    )
    const chat = wrapper.find('Chat')
    expect(chat.exists()).to.equal(true)

    // Stop polling
    chat.setState({ show: false })
    chat.update()
    setTimeout(() => {
      wrapper.unmount()
      done()
    }, 100)
  })

})
