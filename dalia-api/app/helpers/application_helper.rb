module ApplicationHelper
  def code_snippet(client)
    html_code =
%{<script src="http://cdn.goodniceweb.me/dalia-client.js"></script>
<script>
  window.daliaClient = new DaliaClient.default({
    apiKey: "#{client.api_token}"
  })
</script>}
    CodeRay.scan(html_code, :html).div
  end
end
