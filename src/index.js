import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledHList = styled.div`
  display: flex;
  > .h {
    padding: 1rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    background: transparent;
    display: none;

    > div {
      width: 2rem;
      height: 2rem;
      border-radius: 2rem;
      background: black;
      color: white;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      z-index: 99;
      position: absolute;
    }
  }

  > .w {
    z-index: 98;
    //margin-left: -2.5rem;
    //margin-right: -2.5rem;
    overflow: auto;
    scrollbar-width: none;
    flex: 1;
    &::-webkit-scrollbar {
      display: none;
    }

    .c {
      flex: 1;
      list-style-type: none;
      padding: 0;
      display: grid;
      grid-gap: ${(props) => props.gap || 1}rem;
      grid-auto-flow: column;

      & > * > div {
        //background-color: whitesmoke;
        //height: 10rem;
        //width: 10rem;
        //display: inline-flex;
        //flex-direction: column;
        //justify-content: center;
        //align-items: center;
      }
    }
  }
  &.auto .c {
    display: flex;
    flex-wrap: wrap;
  }
  &.row .c {
    display: block;
    position: relative;
    & > * {
      width: 100% !important;
      margin-bottom: ${(props) => props.gap || 1}rem;
    }
  }
`

export const List = ({ items, component, gap, flow }) => {
  const [position, setPosition] = useState(0)
  const [isLeft, setLeft] = useState(true)
  const [isRight, setRight] = useState(false)
  const [data, setData] = useState([])

  const onScroll = (e) => {
    const sw = e.nativeEvent.target.children[0].scrollWidth
    const cw = e.nativeEvent.target.children[0].clientWidth
    setRight(sw > cw + e.nativeEvent.target.scrollLeft)
    setPosition(e.nativeEvent.target.scrollLeft)
  }

  useEffect(() => {
    setLeft(position > 0)
    if (Array.isArray(items)) {
      setData(items)
    }
  }, [position])

  return (
    <StyledHList className={flow} gap={gap}>
      <div className='h'>{isLeft && <div>&laquo;</div>}</div>
      <div className='w' onScroll={onScroll}>
        <div className='c'>{data?.map((item) => component(item))}</div>
      </div>
      <div className='h'>{isRight && <div>&raquo;</div>}</div>
    </StyledHList>
  )
}

List.propTypes = {
  gap: PropTypes.number,
  items: PropTypes.array,
  flow: PropTypes.oneOf(['horizontal', 'auto', 'row'])
}

List.defaultProps = {
  items: [],
  gap: 1,
  flow: 'horizontal'
}
