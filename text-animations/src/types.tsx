import React from 'react';
import {AbsoluteFill} from 'remotion';

export type TextProps = {
  text: string;
  color: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  /** "transparent" keeps the alpha channel for overlaying on footage. */
  background: string;
};

export const defaultTextProps: TextProps = {
  text: 'Your Text Here',
  color: '#ffffff',
  fontSize: 140,
  fontFamily: 'Inter, Helvetica, Arial, sans-serif',
  fontWeight: 800,
  background: 'transparent',
};

/** Centers children on a (by default transparent) full-frame canvas. */
export const Stage: React.FC<{
  background: string;
  children: React.ReactNode;
}> = ({background, children}) => (
  <AbsoluteFill
    style={{
      background,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {children}
  </AbsoluteFill>
);
