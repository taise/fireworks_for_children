require 'sinatra'
require 'sinatra/reloader' if development?
require 'sinatra-websocket'

set :sockets, []

get '/' do
  File.read(Pathname('public') / 'index.html')
end

post '/fire' do
  request.body.rewind
  msg = request.body.read
  settings.sockets.each { |socket| socket.send(msg) }
  logger.info msg
end

get '/websocket' do
  return unless request.websocket?
  request.websocket do |ws|
    ws.onopen { settings.sockets << ws }
    ws.onmessage { |msg| logger.info "onmessage: " + msg }
    ws.onclose { settings.sockets.delete(ws) }
  end
end
