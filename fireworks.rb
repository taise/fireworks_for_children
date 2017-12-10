require 'sinatra'
require 'sinatra/reloader' if development?
require 'sinatra-websocket'

# TODO: js no cache header

set :sockets, []
set :clients, []
set :static_cache_control, [:private, { max_age: 0 }]

after do
  cache_control :no_cache
end

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

get '/client' do
  return unless request.websocket?
  request.websocket do |ws|
    ws.onopen { settings.clients << ws }
    ws.onmessage { |msg| logger.info "onmessage: " + msg }
    ws.onclose { settings.clients.delete(ws) }
  end
end

get '/reload' do
  command = { command: 'reload' }.to_json
  settings.sockets.each { |socket| socket.send(command) }
  settings.clients.each { |socket| socket.send(command) }
  logger.info command
end


get '/healthcheck' do; end
