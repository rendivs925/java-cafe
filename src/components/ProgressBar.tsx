"use client";

import useProgressBar from "@/hooks/useProgressBar";
import { type ReactElement } from "react";

export interface ProgressBarProps {}

export default function ProgressBar(props: ProgressBarProps): ReactElement {
  const renderContent = useProgressBar();
  return <section className="pt-navbar">{renderContent()}</section>;
}
