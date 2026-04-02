import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg font-semibold">Đã xảy ra lỗi</p>
            <p className="text-sm text-muted-foreground mt-1">Vui lòng tải lại trang.</p>
            <button
              className="mt-4 text-sm text-orange-500 hover:underline"
              onClick={() => window.location.reload()}
            >
              Tải lại
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
