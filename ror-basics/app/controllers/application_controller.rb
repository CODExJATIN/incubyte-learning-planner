class ApplicationController < ActionController::Base
  # Skip browser version enforcement for JSON API requests (Next.js frontend).
  # allow_browser is intentionally omitted — it's for full HTML browser apps only.

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes

  # Disable CSRF token verification for JSON API requests.
  # The Next.js frontend uses CORS headers, not Rails session-based CSRF tokens.
  protect_from_forgery with: :null_session, if: -> { request.format.json? }
end
