class WebsitesController < ApplicationController
  before_action :authenticate_client!
  before_action :set_website, only: [:show, :edit, :update, :destroy]
  before_action :set_client, only: [:index, :create, :update, :destroy]

  # GET /clients/:client_id/websites
  def index
    @client = Client.find(params[:client_id])
    @websites = @client.websites
  end

  # GET /clients/:client_id/websites/1
  def show
  end

  # GET /clients/:client_id/websites/new
  def new
    @client = Client.find(params[:client_id])
    @website = @client.websites.build
  end

  # GET /clients/:client_id/websites/1/edit
  def edit
  end

  # POST /clients/:client_id/websites
  def create
    @website = Website.new(website_params)

    if @website.save
      redirect_to client_websites_path(@client), notice: 'Website was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /clients/:client_id/websites/1
  def update
    if @website.update(website_params)
      redirect_to client_websites_path(@client), notice: 'Website was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /clients/:client_id/websites/1
  def destroy
    @website.destroy
    redirect_to client_websites_path(@client), notice: 'Website was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_website
      @website = Website.find(params[:id])
    end

    def set_client
      @client = Client.find(params[:client_id])
    end

    # Only allow a trusted parameter "white list" through.
    def website_params
      params.require(:website).permit(:domain).merge(params.permit(:client_id))
    end
end
