class Client < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :websites
  has_many :applicants
  before_create :generate_api_token

  def primary_website
    websites.first
  end

  private

  def generate_api_token
    self.api_token = SecureRandom.hex
  end
end
