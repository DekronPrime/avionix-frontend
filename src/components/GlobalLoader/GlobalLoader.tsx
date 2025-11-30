"use client";

import React from "react";

import "./loader.css";
import { useLoader } from "@/src/context/LoaderContext";

export const GlobalLoader: React.FC = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div id="preloader" aria-hidden={!loading}>
      <div id="loader" />
    </div>
  );
};
