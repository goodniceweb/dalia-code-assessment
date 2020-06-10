class Applicant < ApplicationRecord
  belongs_to :website
  belongs_to :client

  validates :email, presence: true
end
