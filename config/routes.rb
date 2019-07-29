Rails.application.routes.draw do
  devise_for :users
  devise_scope :user do
    get "users", :to => "users#index"
  end
  root 'groups#index'
  resource :user, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
    end 
  end