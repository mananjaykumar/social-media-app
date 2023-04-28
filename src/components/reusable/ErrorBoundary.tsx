import React, { Component } from "react";
import { ErrorBoundaryPage } from "../../pages/ErrorBoundaryPage";
export class ErrorBoundary extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <ErrorBoundaryPage />;
    }
    return children;
  }
}
