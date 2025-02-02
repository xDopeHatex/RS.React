import { Component, ErrorInfo, ReactNode } from 'react';

export default class ErrorBoundary extends Component<{
  fallback: string | ReactNode | ReactNode[];
  children: ReactNode | ReactNode[];
}> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
