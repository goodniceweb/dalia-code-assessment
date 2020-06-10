class ApplicationController < ActionController::Base
  def after_sign_in_path_for(resource)
    return client_websites_url(resource) if resource.is_a?(Client)

    super
  end
end
