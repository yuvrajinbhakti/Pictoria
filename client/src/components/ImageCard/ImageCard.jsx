import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Avatar } from '@mui/material';
import { DownloadRounded } from '@mui/icons-material';
import FileSaver from 'file-saver'; // Corrected import

const Card = styled.div`
  position: relative;
  display: flex;
  border-radius: 20px;
  box-shadow: 1px 2px 40px 8px ${({ theme }) => `rgba(${theme.black || '0,0,0'}, 0.6)`}; // Added fallback
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 1px 2px 40px 8px ${({ theme }) => `rgba(${theme.black || '0,0,0'}, 0.8)`}; // Added fallback
    transform: scale(1.05);
  }

  &:nth-child(7n+1) {
    grid-column: auto / span 2;
    grid-row: auto / span 2;
  }
`;

const HoverOverlay = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.white || '#fff'}; // Added fallback
  transition: opacity 0.3s ease;
  border-radius: 6px;
  justify-content: end;
  padding: 12px;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: ${({ theme }) => theme.white || '#fff'}; // Added fallback
`;

const Author = styled.div`
  font-weight: 600;
  font-size: 45px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.white || '#fff'}; // Added fallback
`;

const ImageCard = ({ item }) => {
  return (
    <Card>
      <LazyLoadImage alt={item?.prompt} style={{borderRadius: '12px'}} width="100%" src={item?.photo} />
      <HoverOverlay>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Prompt>{item?.prompt}</Prompt>
          <Author>
            <Avatar sx={{ width: '32px', height: '32px' }} />
            {item?.Author} {/* Assuming Author is a string */}
          </Author>
          <DownloadRounded
            onClick={() => FileSaver.saveAs(item?.photo, 'download.jpg')} // Corrected FileSaver usage
          />
        </div>
      </HoverOverlay>
    </Card>
  );
};

export default ImageCard;
