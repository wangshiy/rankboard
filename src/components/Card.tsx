import React, { useLayoutEffect, useRef, FC } from "react";
import styled from "styled-components";

const TOP_INCREMENT = 80;

const Container = styled.ul`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Item = styled.li<{ index: number }>`
  position: absolute;
  top: ${(props) => props.index * TOP_INCREMENT}px;
  display: flex;
  align-items: center;
  width: 480px;
  transition: all 0.3s ease 0s;
  &:after {
    position: absolute;
    bottom: 0;
    display: block;
    width: 100%;
    height: 1px;
    content: "";
    background-color: #ededed;
  }
`;

const ListBox = styled.div<{ rank: number }>`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 69px;
  background-color: ${(props) =>
    props.rank === 1
      ? "rgba(254,225,1,0.8)"
      : props.rank === 2
      ? "rgba(215,215,215,0.8)"
      : props.rank === 3
      ? "rgba(167,112,68,0.8)"
      : "transpant"};
  transition: background-color 500ms ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

const ListHead = styled.div`
  flex: 1;
  position: relative;
  padding-right: 8px;
`;

const ListImage = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  z-index: 2;
  margin: 0 auto;

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    content: "";
    border: 2px solid #f87851;
    border-radius: 100%;
  }

  img {
    border-radius: 100%;
    width: 100%;
    height: auto;
    display: block;
    border: none;
  }
`;

const ListName = styled.div`
  flex: 1;
  line-height: 18px;
  font-weight: bold;
  color: #333;
`;

const ListScore = styled.div`
  flex: 1;
  font-size: 16px;
  margin-top: 2px;
  color: #333;
`;

const ListIcon = styled.div`
  font-size: 16px;
  line-height: 24px;
  width: 25px;
  height: 25px;
`;

interface CardProps {
  data: any;
}

const animationSettings = {
  duration: 500,
  easing: "ease-in-out",
  fill: "both",
};

const Card: FC<CardProps> = ({ data }) => {
  const containerRef = useRef<any>(null);

  useLayoutEffect(() => {
    const container = containerRef?.current?.querySelector("ul");
    const children = container.children;
    data.forEach((item: any, index: number) => {
      children[index].animate([{ top: `${item.rank * TOP_INCREMENT}px` }], {
        ...animationSettings,
      });
    });
  }, [data]);

  return (
    <div ref={containerRef}>
      <Container>
        {data.map((e: any, i: number) => {
          return (
            <Item key={e.userID} index={i}>
              <ListBox rank={e.rank + 1}>
                <ListIcon>{e.rank + 1}</ListIcon>
                <ListHead>
                  <ListImage>
                    <img src={e.picture} />
                  </ListImage>
                </ListHead>
                <ListName>{e.displayName}</ListName>
                <ListScore> {e.score} pt</ListScore>
              </ListBox>
            </Item>
          );
        })}
      </Container>
    </div>
  );
};

export default React.memo(Card);
