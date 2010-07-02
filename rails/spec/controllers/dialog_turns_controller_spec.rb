require 'spec_helper'

describe DialogTurnsController do

  def mock_dialog_turn(stubs={})
    @mock_dialog_turn ||= mock_model(DialogTurn, stubs)
  end

  describe "GET index" do
    it "assigns all dialog_turns as @dialog_turns" do
      DialogTurn.stub(:find).with(:all).and_return([mock_dialog_turn])
      get :index
      assigns[:dialog_turns].should == [mock_dialog_turn]
    end
  end

  describe "GET show" do
    it "assigns the requested dialog_turn as @dialog_turn" do
      DialogTurn.stub(:find).with("37").and_return(mock_dialog_turn)
      get :show, :id => "37"
      assigns[:dialog_turn].should equal(mock_dialog_turn)
    end
  end

  describe "GET new" do
    it "assigns a new dialog_turn as @dialog_turn" do
      DialogTurn.stub(:new).and_return(mock_dialog_turn)
      get :new
      assigns[:dialog_turn].should equal(mock_dialog_turn)
    end
  end

  describe "GET edit" do
    it "assigns the requested dialog_turn as @dialog_turn" do
      DialogTurn.stub(:find).with("37").and_return(mock_dialog_turn)
      get :edit, :id => "37"
      assigns[:dialog_turn].should equal(mock_dialog_turn)
    end
  end

  describe "POST create" do

    describe "with valid params" do
      it "assigns a newly created dialog_turn as @dialog_turn" do
        DialogTurn.stub(:new).with({'these' => 'params'}).and_return(mock_dialog_turn(:save => true))
        post :create, :dialog_turn => {:these => 'params'}
        assigns[:dialog_turn].should equal(mock_dialog_turn)
      end

      it "redirects to the created dialog_turn" do
        DialogTurn.stub(:new).and_return(mock_dialog_turn(:save => true))
        post :create, :dialog_turn => {}
        response.should redirect_to(dialog_turn_url(mock_dialog_turn))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved dialog_turn as @dialog_turn" do
        DialogTurn.stub(:new).with({'these' => 'params'}).and_return(mock_dialog_turn(:save => false))
        post :create, :dialog_turn => {:these => 'params'}
        assigns[:dialog_turn].should equal(mock_dialog_turn)
      end

      it "re-renders the 'new' template" do
        DialogTurn.stub(:new).and_return(mock_dialog_turn(:save => false))
        post :create, :dialog_turn => {}
        response.should render_template('new')
      end
    end

  end

  describe "PUT update" do

    describe "with valid params" do
      it "updates the requested dialog_turn" do
        DialogTurn.should_receive(:find).with("37").and_return(mock_dialog_turn)
        mock_dialog_turn.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :dialog_turn => {:these => 'params'}
      end

      it "assigns the requested dialog_turn as @dialog_turn" do
        DialogTurn.stub(:find).and_return(mock_dialog_turn(:update_attributes => true))
        put :update, :id => "1"
        assigns[:dialog_turn].should equal(mock_dialog_turn)
      end

      it "redirects to the dialog_turn" do
        DialogTurn.stub(:find).and_return(mock_dialog_turn(:update_attributes => true))
        put :update, :id => "1"
        response.should redirect_to(dialog_turn_url(mock_dialog_turn))
      end
    end

    describe "with invalid params" do
      it "updates the requested dialog_turn" do
        DialogTurn.should_receive(:find).with("37").and_return(mock_dialog_turn)
        mock_dialog_turn.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :dialog_turn => {:these => 'params'}
      end

      it "assigns the dialog_turn as @dialog_turn" do
        DialogTurn.stub(:find).and_return(mock_dialog_turn(:update_attributes => false))
        put :update, :id => "1"
        assigns[:dialog_turn].should equal(mock_dialog_turn)
      end

      it "re-renders the 'edit' template" do
        DialogTurn.stub(:find).and_return(mock_dialog_turn(:update_attributes => false))
        put :update, :id => "1"
        response.should render_template('edit')
      end
    end

  end

  describe "DELETE destroy" do
    it "destroys the requested dialog_turn" do
      DialogTurn.should_receive(:find).with("37").and_return(mock_dialog_turn)
      mock_dialog_turn.should_receive(:destroy)
      delete :destroy, :id => "37"
    end

    it "redirects to the dialog_turns list" do
      DialogTurn.stub(:find).and_return(mock_dialog_turn(:destroy => true))
      delete :destroy, :id => "1"
      response.should redirect_to(dialog_turns_url)
    end
  end

end
