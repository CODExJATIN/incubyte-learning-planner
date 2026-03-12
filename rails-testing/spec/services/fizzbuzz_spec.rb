require 'rails_helper'
require_relative '../../app/services/fizzbuzz'

describe 'FizzBuzz' do
    it 'should return the number itself when it niether multiple of 3 nor 5' do
        expect(FizzBuzz.call(2)). to eq(2)
    end

    it 'should return Fizz for multiples of 3' do
        expect(FizzBuzz.call(3)).to eq('Fizz')
    end

    it 'should return Buzz for multiples of 5' do
        expect(FizzBuzz.call(5)).to eq('Buzz')
    end
    
    it 'should return FizzBuzz for multiples of 3 & 5' do 
        expect(FizzBuzz.call(15)).to eq('FizzBuzz')
    end
end