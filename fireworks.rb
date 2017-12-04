require 'sinatra'

get '/' do
  File.read(Pathname('public') / 'index.html')
end
