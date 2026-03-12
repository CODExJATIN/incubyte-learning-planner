require 'rails_helper'
require_relative '../../app/services/stringCalculator'

describe StringCalculator do
  describe '.add' do
    context 'when input is empty' do
      it 'should return 0 for an empty string' do
        expect(StringCalculator.add('')).to eq(0)
      end
    end

    context 'when input has a single number' do
      it 'should return the number itself' do
        expect(StringCalculator.add('5')).to eq(5)
      end

      it 'should return 0 for "0"' do
        expect(StringCalculator.add('0')).to eq(0)
      end
    end

    context 'when input has two numbers' do
      it 'should return the sum of two comma-separated numbers' do
        expect(StringCalculator.add('1,2')).to eq(3)
      end

      it 'should return the sum when one number is 0' do
        expect(StringCalculator.add('0,5')).to eq(5)
      end
    end

    context 'when input has multiple numbers' do
      it 'should return the sum of many comma-separated numbers' do
        expect(StringCalculator.add('1,2,3,4,5')).to eq(15)
      end
    end

    context 'when input uses newlines as delimiters' do
      it 'should handle newlines between numbers' do
        expect(StringCalculator.add("1\n2,3")).to eq(6)
      end

      it 'should handle only newline delimiters' do
        expect(StringCalculator.add("1\n2\n3")).to eq(6)
      end
    end

    context 'when input uses a custom delimiter' do
      it 'should support a semicolon delimiter' do
        expect(StringCalculator.add("//;\n1;2")).to eq(3)
      end

      it 'should support a pipe delimiter' do
        expect(StringCalculator.add("//|\n3|4|5")).to eq(12)
      end

      it 'should support a dot delimiter' do
        expect(StringCalculator.add("//.\n1.2.3")).to eq(6)
      end
    end

    context 'when input contains negative numbers' do
      it 'should raise an exception for a single negative number' do
        expect { StringCalculator.add('-1') }.to raise_error(RuntimeError, /negative numbers not allowed/)
      end

      it 'should list all negative numbers in the error message' do
        expect { StringCalculator.add('1,-2,3,-4') }.to raise_error(RuntimeError, /-2, -4/)
      end
    end
  end
end