import React, {useEffect, useState} from "react";
import styled from "styled-components";
import spirite from "../../assets/img/symbol/sprite.svg";
import $host from "../../http";
import {get} from "axios";


const BannerModal = ({ setOpen }) => {
    const [image, setImage] = useState({});
    const [loading, setLoading] = useState(true);

    const getBanner = async () => {
        try {
            const { data } = await $host.get('/api/v1/banner-ads/');
            console.log(data);
            setImage(data.results[0]);
            setLoading(false);
        } catch (e) {
            setOpen();
            console.log(e);
        }
    }

    useEffect(() => {
        getBanner();
    }, []);

    if(loading) {
        return null;
    }

  return (
    <div id="banner-modal">
      <BgofBanner onClick={setOpen} />
      <Wrapper>
        <SvgWrapper>
          <svg className="svg-sprite-icon icon-fi_x w-16" onClick={setOpen}>
            <use href={`${spirite}#fi_x`}></use>
          </svg>
        </SvgWrapper>
        <ImageWrapper>
            <a href={image.url}>
                <img src={image.image} alt="" />
            </a>
        </ImageWrapper>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  position: fixed;
  /* padding: 2rem 1rem; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 40rem;
  z-index: 100;

  @media screen and (max-width: 600px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

const SvgWrapper = styled.div`
  display: flex;
  justify-content: end;

  svg {
    cursor: pointer;
  }
`;

const BgofBanner = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(0.6rem);
  z-index: 95;
`;

export default BannerModal;
