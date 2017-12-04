require 'sinatra'

get '/' do
  File.read(Pathname('public') / 'index.html')
end

post '/fire' do
  request.body.rewind
  logger.info request.body.read
end
