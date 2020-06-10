class CreateApplicant
  class << self
    def call(options = {})
      new(options).call
    end
  end

  attr_reader :applicant

  def initialize(http_origin:,api_key:,email:)
    @host = URI(http_origin).host
    @website = Website.find_by(domain: @host)
    @client = Client.find_by(api_token: api_key)
    @email = email
  end

  def call
    return self unless pre_call_checks_passes?

    @applicant = Applicant.where(email: email, client: client, website: website).first_or_create
    self
  end

  def success?
    pre_call_checks_passes? && applicant.persisted?
  end

  def message
    return 'email is not present' if email.blank?
    return 'website is not registered' if website.nil?
    return 'client is not registered' if client.nil?
    return 'website is not related to the client' unless client_website?

    applicant.errors.full_messages.join('. ').presence
  end

  private

  attr_reader :host, :website, :client, :email

  def pre_call_checks_passes?
    [
      email.present?,
      website.present?,
      client.present?,
      client_website?
    ].all?
  end

  def client_website?
    client&.websites&.where(domain: host)&.exists?
  end
end
