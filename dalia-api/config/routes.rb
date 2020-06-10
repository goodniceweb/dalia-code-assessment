Rails.application.routes.draw do
  devise_for :clients

  root to: "home#index"

  resources :clients, only: :show do
    resources :websites
  end

  namespace :api do
    namespace :v1 do
      post 'subscribe', to: 'applicants#create'
    end
  end
end
