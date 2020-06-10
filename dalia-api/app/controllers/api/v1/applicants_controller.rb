module Api
  module V1
    class ApplicantsController < ActionController::API
      def create
        service = ::CreateApplicant.call(
          http_origin: request.env['HTTP_ORIGIN'],
          api_key: params[:api_key],
          email: params[:email]
        )
        return render json: { status: 'ok', applicant_id: service.applicant.id } if service.success?
          
        render json: { status: 'error', message: service.message }, status: :unprocessable_entity
      end
    end
  end
end
